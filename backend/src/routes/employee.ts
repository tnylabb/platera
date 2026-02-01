import { Router } from 'express';
import * as employeeController from '../controllers/employeeController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

// GET - Összes dolgozó lekérése
router.get('/', verifyToken, employeeController.getAllEmployees);

// POST - Új dolgozó létrehozása
router.post('/', verifyToken, employeeController.createEmployee);

// PUT - Dolgozó módosítása
router.put('/:id', verifyToken, employeeController.updateEmployee);

// DELETE - Dolgozó törlése
router.delete('/:id', verifyToken, employeeController.deleteEmployee);

export default router;