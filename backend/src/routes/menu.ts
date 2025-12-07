import { Router } from 'express';
import * as menuController from '../controllers/menuController';

const router = Router();

// GET - osszes etel lekerese
router.get('/', menuController.getAllMenu);

// GET - etel lekerese ID alapjan
router.get('/:id', menuController.getMenuById);

// POST - uj etel hozzaadasa
router.post('/', menuController.addMenuItem);

// PUT - etel frissitese ID alapjan
router.put('/:id', menuController.updateMenuItem);

// DELETE - etel torlese ID alapjan
router.delete('/:id', menuController.deleteMenuItem);

export default router;