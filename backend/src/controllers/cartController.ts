import { Request, Response } from 'express';
import connection from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Kosár létrehozása

export const createCart = async (req: Request, res: Response) => {
  const { table_id, waiter_id } = req.body;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO CART (table_id, waiter_id) VALUES (?, ?)',
      [table_id, waiter_id]
    );
    return res.status(201).json({ id: result.insertId, table_id, waiter_id });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Kosár tartalmának lekérdezése
export const getCartContent = async (req: Request, res: Response) => {
  const cartId = req.params.id;
  try {
    const query = `
      SELECT ci.*, m.name as menu_name, m.price as unit_price 
      FROM CART_ITEM ci
      JOIN MENU_ITEM m ON ci.menu_item_id = m.id
      WHERE ci.cart_id = ?
    `;
    const [rows] = await connection.query(query, [cartId]);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Tétel hozzáadása a kosárhoz
export const addItemToCart = async (req: Request, res: Response) => {
  const cartId = req.params.id;
  const { menu_item_id, quantity, note } = req.body;

  try {
    const [menuRows] = await connection.query<RowDataPacket[]>(
      'SELECT price FROM MENU_ITEM WHERE id = ?', [menu_item_id]
    );
    if (menuRows.length === 0) return res.status(404).json({ error: "Étel nem található" });
    
    const unitPrice = menuRows[0].price;

    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO CART_ITEM (cart_id, menu_item_id, quantity, note, unit_price) VALUES (?, ?, ?, ?, ?)',
      [cartId, menu_item_id, quantity || 1, note, unitPrice]
    );

    return res.status(201).json({ id: result.insertId, message: "Tétel hozzáadva" });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Tétel frissítése a kosárban
export const updateCartItem = async (req: Request, res: Response) => {
  const { id, itemId } = req.params;
  const { quantity, note } = req.body;

  try {
    await connection.query(
      'UPDATE CART_ITEM SET quantity = ?, note = ? WHERE cart_id = ? AND menu_item_id = ?',
      [quantity, note, id, itemId]
    );
    return res.json({ message: "Kosár frissítve" });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Tétel törlése a kosárból
export const removeItemFromCart = async (req: Request, res: Response) => {
  const { id, itemId } = req.params; // cartId és cartItemId
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'DELETE FROM CART_ITEM WHERE id = ? AND cart_id = ?',
      [itemId, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Tétel nem található" });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Teljes kosár törlése
export const deleteCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await connection.query('DELETE FROM CART WHERE id = ?', [id]);
    return res.status(200).json({ message: "Kosár törölve" });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};