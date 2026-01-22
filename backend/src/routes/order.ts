import { Router } from 'express';
import * as orderController from '../controllers/orderController';

const router = Router();

// POST - rendelés létrehozása kosár alapján
router.post('/', orderController.createOrderFromCart);

// GET - rendelések lekérdezése, státusz frissítése
router.get('/', orderController.getOrders);

// GET - rendelés lekérdezése ID alapján
router.get('/:id', orderController.getOrderById);

// PATCH - rendelés státusz frissítése
router.patch('/:id/status', orderController.updateOrderStatus);

export default router;