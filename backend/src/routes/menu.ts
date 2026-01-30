import { Router } from 'express';
import * as menuController from '../controllers/menuController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

// GET - osszes etel lekerese
router.get('/', menuController.getAllMenu);

// GET - etel lekerese ID alapjan
router.get('/:id', menuController.getMenuById);

// POST - uj etel hozzaadasa
router.post('/', verifyToken, menuController.addMenuItem);

// PUT - etel frissitese ID alapjan
router.put('/:id', verifyToken, menuController.updateMenuItem);

// DELETE - etel torlese ID alapjan
router.delete('/:id', verifyToken, menuController.deleteMenuItem);

export default router;