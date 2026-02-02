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

// PUT - tétel frissítése a kosárban
router.put('/:id/items/:itemId', verifyToken, cartController.updateCartItem);

// DELETE - tétel eltávolítása a kosárból
router.delete('/:id/items/:itemId', verifyToken, cartController.removeItemFromCart);

// DELETE - kosár törlése
router.delete('/:id', verifyToken, cartController.deleteCart);

export default router;