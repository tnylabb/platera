import { Request, Response } from 'express';
import connection from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import config from '../config/config';

// Felhasználói bejelentkezés kezelése

interface Employee extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  full_name: string;
  role: string;
}

const isBcryptHash = (value: string) => {
  return /^\$2[aby]\$\d{2}\$/.test(value) && value.length >= 50;
};

// Login funkció
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Hiányzó email vagy jelszó' });
  }

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
    const isMatch = isBcryptHash(user.password)
      ? await bcrypt.compare(password, user.password)
      : password === user.password;

    if (!isMatch) {
      return res.status(401).json({ error: "Hibás email vagy jelszó" });
    }

    if (!isBcryptHash(user.password)) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.query('UPDATE EMPLOYEE SET password = ? WHERE id = ?', [
        hashedPassword,
        user.id,
      ]);
    }

    // Token generálása (JWT)
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.full_name }, 
      config.jwtSecret, 
      { expiresIn: '8h' }
    );

    // Válasz küldése
    return res.json({
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
    return res.status(500).json({ error: "Szerver hiba" });
  }
};