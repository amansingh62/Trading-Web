import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../src/modules/auth/authRoutes.js";
import { env } from "../src/config/env.js";

const app = express();

app.use(cors({
    origin: env.FRONTEND!,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

export default app;