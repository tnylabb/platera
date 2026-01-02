import { Request, Response } from 'express';
import connection from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

// Felhasználói bejelentkezés kezelése

interface Employee extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  full_name: string;
  role: string;
}

// Login funkció
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Felhasználó keresése email alapján
    const [rows] = await connection.query<Employee[]>(
      'SELECT * FROM EMPLOYEE WHERE email = ?', 
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Hibás email vagy jelszó" });
    }

    const user = rows[0];

    // Jelszó ellenőrzése
    const isMatch = password === user.password; 

    if (!isMatch) {
      return res.status(401).json({ error: "Hibás email vagy jelszó" });
    }

    // Token generálása (JWT)
    const secret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.full_name }, 
      secret, 
      { expiresIn: '8h' }
    );

    // Válasz küldése
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login hiba:", error);
    res.status(500).json({ error: "Szerver hiba" });
  }
};