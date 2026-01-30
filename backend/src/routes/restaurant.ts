import { Router } from 'express';
import * as restaurantController from '../controllers/restaurantController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

// GET - informaciok
router.get('/info', restaurantController.getRestaurantInfo);

// PUT - informaciok frissitese
router.put('/info', verifyToken, restaurantController.updateRestaurantInfo);

export default router;