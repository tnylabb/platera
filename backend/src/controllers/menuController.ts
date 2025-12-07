import { Request, Response } from 'express';

const mockMenu = [
  { id: 1, name: "Lasagne Bolognese", description: "Rétegelt tészta....", price: 3500, category_id: 2, available: true },
  { id: 2, name: "Spaghetti Carbonara", description: "Tojás, pancetta...", price: 3200, category_id: 2, available: true }
];

export const getAllMenu = (_req: Request, res: Response) => {
  res.json(mockMenu);
};

export const getMenuById = (req: Request, res: Response) => {
  const item = mockMenu.find(m => m.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Nem található a menüben" });
  res.json(item);
};

export const addMenuItem = (req: Request, res: Response) => {
  const newItem = { id: mockMenu.length + 1, ...req.body };
  mockMenu.push(newItem);
  res.status(201).json(newItem);
};

export const updateMenuItem = (req: Request, res: Response) => {
  const item = mockMenu.find(m => m.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Nem található a menüben" });
  Object.assign(item, req.body);
  res.json(item);
};

export const deleteMenuItem = (req: Request, res: Response) => {
  const index = mockMenu.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Nem található a menüben" });
  mockMenu.splice(index, 1);
  res.status(204).send();
};