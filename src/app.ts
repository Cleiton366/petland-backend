import express from "express";
import { router as petsRouter } from "./routes/Pets";
import { router as userRouter } from "./routes/User";
import { router as donationRequestRouter } from "./routes/DonationRequest";
import { router as chatRouter } from "./routes/Chat";
import cookieParser from "cookie-parser";
import "dotenv/config.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_API, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(cookieParser());

app.use(petsRouter);
app.use(userRouter);
app.use(donationRequestRouter);
app.use(chatRouter);

export { app };
