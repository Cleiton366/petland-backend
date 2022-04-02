import express from "express";
import { router as petsRouter } from "./routes/Pets";
import { router as userRouter } from "./routes/User";

const app = express();
app.use(express.json());

app.use(petsRouter);
app.use(userRouter);

export { app };
