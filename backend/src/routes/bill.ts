import { Router } from 'express';
import * as billController from '../controllers/billController';

const router = Router();

// Alap számla műveletek

// POST - számla létrehozása egy asztalhoz tartozó aktív rendelések alapján
router.post('/', billController.createBill);

// PATCH - számla kifizetése
router.patch('/:id/pay', billController.payBill);

// GET - számla lekérdezése ID alapján
router.get('/:id', billController.getBillById);

// Részszámla műveletek

// POST - számla felosztása részszámlákra
router.post('/:id/split', billController.splitBill);

// GET - részszámlák lekérdezése egy számla alapján
router.get('/:id/split', billController.getSplitBills);

// PATCH - részszámla kifizetése
router.patch('/split/:id/pay', billController.paySplitBill);

export default router;