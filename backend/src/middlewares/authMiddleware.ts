import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/tokens.js";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({ message: "Unathorized" });

    try {
        const payload = verifyAccessToken(token);
        req.userId = payload.userId;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired access token" });
    }
};