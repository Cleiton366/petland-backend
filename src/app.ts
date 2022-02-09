import express from "express";
import cors from "cors";
import { router as petsRouter } from "./routes/Pets";
import { router as authRouter } from "./routes/Authentication";

const app = express();
app.use(express.json());

app.use(petsRouter);
app.use(authRouter);

export {app};
