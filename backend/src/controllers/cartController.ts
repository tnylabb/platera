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
    res.status(201).json({ id: result.insertId, table_id, waiter_id });
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
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
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
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

    res.status(201).json({ id: result.insertId, message: "Tétel hozzáadva" });
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
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
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
  }
};