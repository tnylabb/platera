import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

// POST - rendelés létrehozása kosár alapján
router.post('/', verifyToken, orderController.createOrderFromCart);

// GET - rendelések lekérdezése, státusz frissítése
router.get('/', verifyToken, orderController.getOrders);

// GET - rendelés lekérdezése ID alapján
router.get('/:id', verifyToken, orderController.getOrderById);

// PATCH - rendelés státusz frissítése
router.patch('/:id/status', verifyToken, orderController.updateOrderStatus);

// PATCH - rendelés tétel státusz frissítése
router.patch('/:id/items/:itemId', verifyToken, orderController.updateOrderItemStatus);

export default router;