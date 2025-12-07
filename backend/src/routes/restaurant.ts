import { Router } from 'express';
import * as restaurantController from '../controllers/restaurantController';

const router = Router();

// GET - informaciok
router.get('/info', restaurantController.getRestaurantInfo);

// PUT - informaciok frissitese
router.put('/info', restaurantController.updateRestaurantInfo);

export default router;