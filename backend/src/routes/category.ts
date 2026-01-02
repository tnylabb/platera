import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = Router();
// GET - összes kategóriák lekérése
router.get('/', categoryController.getAllCategories);

// GET - kategória lekérése ID alapján
router.post('/', categoryController.createCategory);

// PUT - kategória frissítése ID alapján
router.put('/:id', categoryController.updateCategory);

// DELETE - kategória törlése ID alapján
router.delete('/:id', categoryController.deleteCategory);

export default router;