import { Router } from 'express';
import * as statsController from '../controllers/statsController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

// GET - napi statisztika
// /api/stats/daily?date=yyyy-mm-dd vagy /api/stats/daily a mai naphoz
router.get('/daily', verifyToken, statsController.getDailyStats);

// GET - heti statisztika
// Használat: /api/stats/weekly?date=yyyy-mm-dd vagy /api/stats/weekly a mai héthez
router.get('/weekly', verifyToken, statsController.getWeeklyStats);

// GET - havi statisztika
// Használat: /api/stats/monthly?date=yyyy-mm-dd vagy /api/stats/monthly a mai hónaphoz
router.get('/monthly', verifyToken, statsController.getMonthlyStats);

// GET - népszerű ételek
// Használat: /api/stats/popular-items?date=yyyy-mm-dd vagy /api/stats/popular-items a mai naphoz
router.get('/popular-items', verifyToken, statsController.getPopularItems);

export default router;