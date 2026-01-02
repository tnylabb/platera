import { Router } from 'express';
import * as cartController from '../controllers/cartController';

const router = Router();

// POST - új kosár létrehozása
router.post('/', cartController.createCart);

// GET - kosár tartalmának lekérése ID alapján
router.get('/:id', cartController.getCartContent);

// POST - tétel hozzáadása a kosárhoz
router.post('/:id/items', cartController.addItemToCart);

// DELETE - tétel eltávolítása a kosárból
router.delete('/:id/items/:itemId', cartController.removeItemFromCart);

export default router;