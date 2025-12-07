import { Request, Response } from 'express';

const mockRestaurantInfo = {
  address: "1134 Budapest, Váci út 21.",
  phone: "+36 1 234 5678",
  email: "info@platera.hu",
  openhours: "H-P: 12:00-23:00, Szo-V: 11:00-00:00"
};

export const getRestaurantInfo = (_req: Request, res: Response) => {
  res.json(mockRestaurantInfo);
};

export const updateRestaurantInfo = (req: Request, res: Response) => {
  const { address, phone, email, openhours } = req.body;
  if (address) mockRestaurantInfo.address = address;
  if (phone) mockRestaurantInfo.phone = phone;
  if (email) mockRestaurantInfo.email = email;
  if (openhours) mockRestaurantInfo.openhours = openhours;
  res.json(mockRestaurantInfo);
};