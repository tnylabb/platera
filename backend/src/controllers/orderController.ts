import { Request, Response } from 'express';
import connection from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Rendelés létrehozása egy kosár alapján
export const createOrderFromCart = async (req: Request, res: Response) => {
  const { cart_id } = req.body;
  if (!cart_id) return res.status(400).json({ error: "Cart ID szükséges" });

  const conn = await connection.getConnection();
  try {
    await conn.beginTransaction();

    // Kosár adatok lekérése
    const [cartRows] = await conn.query<RowDataPacket[]>(
      'SELECT table_id, waiter_id FROM CART WHERE id = ?', 
      [cart_id]
    );

    if (cartRows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: "Kosár nem található" });
    }
    const { table_id, waiter_id } = cartRows[0];

    // Rendelés létrehozása
    const [orderResult] = await conn.query<ResultSetHeader>(
      'INSERT INTO `ORDER` (table_id, waiter_id, status) VALUES (?, ?, ?)',
      [table_id, waiter_id, 'pending']
    );
    const orderId = orderResult.insertId;

    // Tételek átmásolása
    const [cartItems] = await conn.query<RowDataPacket[]>(
      'SELECT menu_item_id, quantity, note, unit_price FROM CART_ITEM WHERE cart_id = ?',
      [cart_id]
    );

    if (cartItems.length === 0) {
      await conn.rollback();
      return res.status(400).json({ error: "Üres kosárból nem lehet rendelni" });
    }

    for (const item of cartItems) {
      await conn.query(
        'INSERT INTO ORDER_ITEM (order_id, menu_item_id, quantity, note, unit_price, status) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, item.menu_item_id, item.quantity, item.note, item.unit_price, 'pending']
      );
    }

    // Kosár ürítése
    await conn.query('DELETE FROM CART_ITEM WHERE cart_id = ?', [cart_id]);
    await conn.query('DELETE FROM CART WHERE id = ?', [cart_id]);

    await conn.commit();
    return res.status(201).json({ message: "Rendelés leadva", orderId });

  } catch (error) {
    await conn.rollback();
    return res.status(500).json({ error: "Szerver hiba" });
  } finally {
    conn.release();
  }
};

// Rendelések lekérdezése
export const getOrders = async (req: Request, res: Response) => {
  const status = req.query.status;
  try {
    let query = 'SELECT * FROM `ORDER`';
    const params: any[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY ordered_at DESC';

    const [rows] = await connection.query(query, params);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Rendelés lekérdezése ID alapján
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const [orderRows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM `ORDER` WHERE id = ?', [req.params.id]
    );
    if (orderRows.length === 0) return res.status(404).json({ error: "Nincs ilyen rendelés" });

    const [itemRows] = await connection.query<RowDataPacket[]>(
      `SELECT oi.*, m.name as menu_name 
       FROM ORDER_ITEM oi 
       JOIN MENU_ITEM m ON oi.menu_item_id = m.id 
       WHERE oi.order_id = ?`,
      [req.params.id]
    );

    return res.json({ ...orderRows[0], items: itemRows });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Rendelés státusz frissítése
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE `ORDER` SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    
    if (result.affectedRows === 0) return res.status(404).json({ error: "Nincs ilyen rendelés" });
    return res.json({ id: req.params.id, status });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Rendelés tétel státusz frissítése
export const updateOrderItemStatus = async (req: Request, res: Response) => {
  const { id, itemId } = req.params;
  const { status } = req.body;

  try {
    await connection.query(
      'UPDATE ORDER_ITEM SET status = ? WHERE order_id = ? AND menu_item_id = ?',
      [status, id, itemId]
    );
    return res.json({ message: "Tétel státusza frissítve" });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};