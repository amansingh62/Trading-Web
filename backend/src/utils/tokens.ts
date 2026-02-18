import jwt from "jsonwebtoken";
import type { JwtPayload }  from "../types/authTypes.js";
import { env } from "../config/env.js"

export const generateAccessToken = (userId: string) => {
   return jwt.sign({ userId }, env.ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, env.REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) : JwtPayload => {
    return jwt.verify(token, env.ACCESS_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string) : JwtPayload => {
    return jwt.verify(token, env.REFRESH_SECRET) as JwtPayload;
};
