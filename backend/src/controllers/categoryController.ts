import { Request, Response } from 'express';
import connection from '../db';
import { ResultSetHeader } from 'mysql2';

// Kategória létrehozása, lekérdezése, frissítése, törlése

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const [rows] = await connection.query('SELECT * FROM CATEGORY ORDER BY id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO CATEGORY (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE CATEGORY SET name = ?, description = ? WHERE id = ?',
      [name, description, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Nem található" });
    res.json({ id: req.params.id, name, description });
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const [result] = await connection.query<ResultSetHeader>('DELETE FROM CATEGORY WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Nem található" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
  }
};