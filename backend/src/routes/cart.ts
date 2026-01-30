import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

// POST - új kosár létrehozása
router.post('/', verifyToken, cartController.createCart);

// GET - kosár tartalmának lekérése ID alapján
router.get('/:id', verifyToken, cartController.getCartContent);

// POST - tétel hozzáadása a kosárhoz
router.post('/:id/items', verifyToken, cartController.addItemToCart);

// DELETE - tétel eltávolítása a kosárból
router.delete('/:id/items/:itemId', verifyToken, cartController.removeItemFromCart);

export default router;