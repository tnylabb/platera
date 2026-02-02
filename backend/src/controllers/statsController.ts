import { Request, Response } from "express";
import connection from "../db";
import { RowDataPacket } from "mysql2";

// Dátum meghatározása
const getTargetDate = (req: Request): string => {
  return (req.query.date as string) || new Date().toISOString().slice(0, 10);
};

// Napi statisztika
export const getDailyStats = async (req: Request, res: Response) => {
  try {
    const targetDate = getTargetDate(req);

    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total_amount), 0) as total_revenue
       FROM \`BILL\` 
       WHERE DATE(created_at) = ?`,
      [targetDate],
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Heti statisztika
export const getWeeklyStats = async (req: Request, res: Response) => {
  try {
    const targetDate = getTargetDate(req);

    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total_amount), 0) as total_revenue
       FROM \`BILL\` 
       WHERE YEARWEEK(created_at, 1) = YEARWEEK(?, 1)`,
      [targetDate],
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Havi statisztika
export const getMonthlyStats = async (req: Request, res: Response) => {
  try {
    const targetDate = getTargetDate(req);

    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total_amount), 0) as total_revenue
       FROM \`BILL\` 
       WHERE MONTH(created_at) = MONTH(?) AND YEAR(created_at) = YEAR(?)`,
      [targetDate, targetDate],
    );

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};

// Top 5 étel
export const getPopularItems = async (req: Request, res: Response) => {
  try {
    const targetDate = getTargetDate(req);

    // Ételek összekapcsolása a rendelésekkel
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT 
        m.name, 
        SUM(oi.quantity) as total_sold 
       FROM ORDER_ITEM oi
       JOIN MENU_ITEM m ON oi.menu_item_id = m.id
       JOIN ORDERS o ON oi.order_id = o.id
       WHERE DATE(o.created_at) = ?
       GROUP BY m.id, m.name
       ORDER BY total_sold DESC, m.name ASC
       LIMIT 5`,
      [targetDate],
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: "Szerver hiba" });
  }
};
