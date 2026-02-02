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
import orderRouter from './routes/order';
import billRouter from './routes/bill';
import employeeRouter from './routes/employee';
import statsRouter from './routes/stats';

// Routeok
app.use('/api/restaurant', restaurantRouter);
app.use('/api/menu', menuRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/bills', billRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/stats', statsRouter);

// Teszt endpoint
app.get("/", (_req, res) => {
  res.send("Hello!");
});

export default app;