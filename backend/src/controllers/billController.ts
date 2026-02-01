import { Request, Response } from 'express';
import connection from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Számla létrehozása egy asztalhoz tartozó aktív rendelések alapján
export const createBill = async (req: Request, res: Response) => {
  const { table_id, waiter_id, payment_method } = req.body;

  const conn = await connection.getConnection();
  try {
    await conn.beginTransaction();

    // Aktív rendelési tételek összegyűjtése az asztalról
    const [items] = await conn.query<RowDataPacket[]>(
      `SELECT oi.menu_item_id, m.name as item_name, oi.quantity, oi.unit_price, oi.order_id
       FROM ORDER_ITEM oi
       JOIN \`ORDER\` o ON oi.order_id = o.id
       JOIN MENU_ITEM m ON oi.menu_item_id = m.id
       WHERE o.table_id = ? AND o.status != 'completed' AND o.status != 'cancelled'`,
      [table_id]
    );

    if (items.length === 0) {
      await conn.rollback();
      return res.status(400).json({ error: "Nincs számlázható tétel az asztalon" });
    }

    // Végösszeg számolása
    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.quantity * item.unit_price;
    }
    
    const billNumber = `Platera-${Date.now()}`;

    // Számla létrehozása
    const [billResult] = await conn.query<ResultSetHeader>(
      'INSERT INTO BILL (table_id, waiter_id, bill_number, total_amount, payment_method, status) VALUES (?, ?, ?, ?, ?, ?)',
      [table_id, waiter_id, billNumber, totalAmount, payment_method, 'unpaid']
    );
    const billId = billResult.insertId;

    // Számla tételek rögzítése
    for (const item of items) {
      await conn.query(
        'INSERT INTO BILL_ITEM (bill_id, item_name, quantity, unit_price, total) VALUES (?, ?, ?, ?, ?)',
        [billId, item.item_name, item.quantity, item.unit_price, item.quantity * item.unit_price]
      );
    }

    // Rendelések lezárása
    const orderIds = [...new Set(items.map(i => i.order_id))];
    if (orderIds.length > 0) {
      await conn.query(
        `UPDATE \`ORDER\` SET status = 'completed', completed_at = NOW() WHERE id IN (?)`,
        [orderIds]
      );
    }

    await conn.commit();
    return res.status(201).json({ message: "Számla elkészült", billId, totalAmount, billNumber });

  } catch (error) {
    await conn.rollback();
    return res.status(500).json({ error: "Szerver hiba" });
  } finally {
    conn.release();
  }
};

// Számla kifizetése
export const payBill = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE BILL SET status = "paid", paid_at = NOW() WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) return res.status(404).json({ error: "Számla nem található" });
    return res.json({ message: "Számla kifizetve" });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Számla lekérdezése ID alapján
export const getBillById = async (req: Request, res: Response) => {
  try {
    const [bill] = await connection.query<RowDataPacket[]>('SELECT * FROM BILL WHERE id = ?', [req.params.id]);
    if (bill.length === 0) return res.status(404).json({ error: "Nincs ilyen számla" });

    const [items] = await connection.query<RowDataPacket[]>('SELECT * FROM BILL_ITEM WHERE bill_id = ?', [req.params.id]);
    
    return res.json({ ...bill[0], items });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Számla szétosztása részekre
export const splitBill = async (req: Request, res: Response) => {
  const billId = req.params.id;
  const { splits } = req.body;

  if (!splits || !Array.isArray(splits) || splits.length === 0) {
    return res.status(400).json({ error: "Hibás felosztási adatok" });
  }

  const conn = await connection.getConnection();
  try {
    await conn.beginTransaction();

    // Eredeti számla lekérdezése
    const [bill] = await conn.query<RowDataPacket[]>('SELECT * FROM BILL WHERE id = ?', [billId]);
    if (bill.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: "Számla nem található" });
    }
    if (bill[0].status === 'paid') {
      await conn.rollback();
      return res.status(400).json({ error: "Ez a számla már ki van fizetve" });
    }

    // Részszámlák létrehozása
    let partIndex = 1;
    const createdSplits = [];

    for (const split of splits) {
      let splitTotal = 0;
      for (const item of split.items) {
        splitTotal += item.total;
      }

      const [splitResult] = await conn.query<ResultSetHeader>(
        'INSERT INTO SPLIT_BILL (original_bill_id, part_number, total_amount, status) VALUES (?, ?, ?, ?)',
        [billId, partIndex, splitTotal, 'unpaid']
      );
      const splitBillId = splitResult.insertId;

      // Tételek beszúrása
      for (const item of split.items) {
        await conn.query(
          'INSERT INTO SPLIT_BILL_ITEM (split_bill_id, item_name, quantity, unit_price, total) VALUES (?, ?, ?, ?, ?)',
          [splitBillId, item.name, item.quantity, item.price, item.total]
        );
      }

      createdSplits.push({ id: splitBillId, part: partIndex, total: splitTotal });
      partIndex++;
    }

    await conn.commit();
    return res.status(201).json({ message: "Számla sikeresen felosztva", splits: createdSplits });

  } catch (error) {
    await conn.rollback();
    return res.status(500).json({ error: "Szerver hiba a számla osztásakor" });
  } finally {
    conn.release();
  }
};

// Részszámla kifizetése
export const paySplitBill = async (req: Request, res: Response) => {
  const splitId = req.params.id;
  const { payment_method } = req.body;

  const conn = await connection.getConnection();
  try {
    await conn.beginTransaction();

    const [updateResult] = await conn.query<ResultSetHeader>(
      'UPDATE SPLIT_BILL SET status = "paid", paid_at = NOW(), payment_method = ? WHERE id = ?',
      [payment_method || 'card', splitId]
    );

    if (updateResult.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ error: "Részszámla nem található" });
    }

    // Eredeti számla ID lekérése
    const [splitRow] = await conn.query<RowDataPacket[]>('SELECT original_bill_id FROM SPLIT_BILL WHERE id = ?', [splitId]);
    const originalBillId = splitRow[0].original_bill_id;

    // Kifizetetlen részszámlák ellenőrzése
    const [pendingSplits] = await conn.query<RowDataPacket[]>(
      'SELECT count(*) as count FROM SPLIT_BILL WHERE original_bill_id = ? AND status = "unpaid"',
      [originalBillId]
    );

    // Eredeti számla státusz frissítése, ha minden részszámla ki van fizetve
    if (pendingSplits[0].count === 0) {
      await conn.query(
        'UPDATE BILL SET status = "paid", paid_at = NOW() WHERE id = ?',
        [originalBillId]
      );
    }

    await conn.commit();
    return res.json({ message: "Részszámla kifizetve", allPaid: pendingSplits[0].count === 0 });

  } catch (error) {
    await conn.rollback();
    return res.status(500).json({ error: "Szerver hiba" });
  } finally {
    conn.release();
  }
};

// Osztott számlák lekérdezése
export const getSplitBills = async (req: Request, res: Response) => {
  const billId = req.params.id;
  try {
    const [rows] = await connection.query('SELECT * FROM SPLIT_BILL WHERE original_bill_id = ?', [billId]);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};