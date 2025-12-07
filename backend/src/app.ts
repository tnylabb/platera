import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Routeok importalasa
import restaurantRouter from './routes/restaurant';
import menuRouter from './routes/menu';

// Routeok
app.use('/api/restaurant', restaurantRouter);
app.use('/api/menu', menuRouter);

// Teszt endpoint
app.get("/", (_req, res) => {
  res.send("Hello!");
});

export default app;