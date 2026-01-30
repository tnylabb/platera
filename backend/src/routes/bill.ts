import { Router } from 'express';
import * as billController from '../controllers/billController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

// Alap számla műveletek

// POST - számla létrehozása egy asztalhoz tartozó aktív rendelések alapján
router.post('/', verifyToken, billController.createBill);

// PATCH - számla kifizetése
router.patch('/:id/pay', verifyToken, billController.payBill);

// GET - számla lekérdezése ID alapján
router.get('/:id', verifyToken, billController.getBillById);

// Részszámla műveletek

// POST - számla felosztása részszámlákra
router.post('/:id/split', verifyToken, billController.splitBill);

// GET - részszámlák lekérdezése egy számla alapján
router.get('/:id/split', verifyToken, billController.getSplitBills);

// PATCH - részszámla kifizetése
router.patch('/split/:id/pay', verifyToken, billController.paySplitBill);

export default router;