import express from "express";
import { router as petsRouter } from "./routes/Pets";
import { router as userRouter } from "./routes/User";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(petsRouter);
app.use(userRouter);

export { app };
