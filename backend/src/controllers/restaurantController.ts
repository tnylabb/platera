import { Request, Response } from 'express';
import connection from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Étterem információ lekérdezése és frissítése

export const getRestaurantInfo = async (_req: Request, res: Response) => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM RESTAURANT_INFO LIMIT 1');
    if (rows.length === 0) return res.status(404).json({ error: "Étterem információ nem található" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
  }
};

export const updateRestaurantInfo = async (req: Request, res: Response) => {
  const { address, phone, email, openhours } = req.body;
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE RESTAURANT_INFO SET address = ?, phone = ?, email = ?, openhours = ? WHERE id = (SELECT id FROM (SELECT id FROM RESTAURANT_INFO LIMIT 1) as t)',
      [address, phone, email, openhours]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Nem sikerült frissíteni" });
    
    const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM RESTAURANT_INFO LIMIT 1');
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Szerver hiba" });
  }
};