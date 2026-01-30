import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();
// GET - összes kategóriák lekérése
router.get('/', categoryController.getAllCategories);

// POST - új kategória létrehozása
router.post('/', verifyToken, categoryController.createCategory);

// PUT - kategória frissítése ID alapján
router.put('/:id', verifyToken, categoryController.updateCategory);

// DELETE - kategória törlése ID alapján
router.delete('/:id', verifyToken, categoryController.deleteCategory);

export default router;