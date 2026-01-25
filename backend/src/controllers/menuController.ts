import { Request, Response } from 'express';
import connection from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Menüelemek létrehozása, lekérdezése, frissítése, törlése

export const getAllMenu = async (_req: Request, res: Response) => {
  try {
    const [rows] = await connection.query('SELECT * FROM MENU_ITEM');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

export const getMenuById = async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM MENU_ITEM WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Nem található a menüben" });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

export const addMenuItem = async (req: Request, res: Response) => {
  const { category_id, name, description, price, image, available } = req.body;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO MENU_ITEM (category_id, name, description, price, image, available) VALUES (?, ?, ?, ?, ?, ?)',
      [category_id, name, description, price, image, available ?? true]
    );
    return res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  const { category_id, name, description, price, image, available } = req.body;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE MENU_ITEM SET category_id = ?, name = ?, description = ?, price = ?, image = ?, available = ? WHERE id = ?',
      [category_id, name, description, price, image, available, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Nem található a menüben" });
    return res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const [result] = await connection.query<ResultSetHeader>('DELETE FROM MENU_ITEM WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Nem található a menüben" });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};