import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Routeok importalasa
import restaurantRouter from './routes/restaurant';
import menuRouter from './routes/menu';
import authRouter from './routes/auth';
import categoryRouter from './routes/category';
import cartRouter from './routes/cart';

// Routeok
app.use('/api/restaurant', restaurantRouter);
app.use('/api/menu', menuRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/cart', cartRouter);

// Teszt endpoint
app.get("/", (_req, res) => {
  res.send("Hello!");
});

export default app;