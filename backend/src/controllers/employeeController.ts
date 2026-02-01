import { Request, Response } from 'express';
import connection from '../db';
import bcrypt from 'bcryptjs';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Dolgozók listázása
export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const [rows] = await connection.query('SELECT id, email, full_name, role FROM EMPLOYEE');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Új dolgozó létrehozása
export const createEmployee = async (req: Request, res: Response) => {
  const { email, password, full_name, role } = req.body;

  if (!email || !password || !full_name || !role) {
    return res.status(400).json({ error: "Minden mező kitöltése kötelező" });
  }

  try {
    // Email ellenőrzése
    const [existing] = await connection.query<RowDataPacket[]>('SELECT id FROM EMPLOYEE WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Az email cím már foglalt" });
    }

    // Jelszó titkosítása
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO EMPLOYEE (email, password, full_name, role) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, full_name, role]
    );

    return res.status(201).json({ 
      id: result.insertId, 
      email, 
      full_name, 
      role 
    });

  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Dolgozó adatainak módosítása
export const updateEmployee = async (req: Request, res: Response) => {
  const { email, full_name, role } = req.body;
  const { id } = req.params;

  try {
    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE EMPLOYEE SET email = ?, full_name = ?, role = ? WHERE id = ?',
      [email, full_name, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dolgozó nem található" });
    }

    return res.json({ id, email, full_name, role });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Dolgozó törlése
export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result] = await connection.query<ResultSetHeader>(
      'DELETE FROM EMPLOYEE WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dolgozó nem található" });
    }

    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};