import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import { compareHash, hashValue } from "../../utils/hash.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/tokens.js";
import { clearAuthCookies, setAccessCookies, setRefreshCookies } from "../../utils/cookies.js";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const isExist = await prisma.user.findUnique({
        where: { email }
    });

    if(isExist) return res.status(400).json({ message: "User Exists" });

    const hashPassword = await hashValue(password);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    });

    res.status(201).json({ message: "User created successfully" });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email }});
    if(!user) return res.status(400).json({ message: "User does not exists" });

    const isValid = await compareHash(password, user.password);
    if(!isValid) return res.status(400).json({ message: "Invalid Credentials" });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const hashRefresh = await hashValue(refreshToken);

    await prisma.refreshToken.create({
        data: {
            tokenHash: hashRefresh,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    });

    setAccessCookies(res, accessToken);
    setRefreshCookies(res, refreshToken);

    res.json({ message: "Logged In" });
};

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).json({ message: "Unathorized" });

    try {
        const payload = verifyRefreshToken(token);
        
        const tokens = await prisma.refreshToken.findMany({
            where: { userId: payload.userId }
        });

        let matchToken = null;

        for(const dbToken of tokens) {
            const isMatch = await compareHash(token, dbToken.tokenHash);
            if(isMatch) {
                matchToken = dbToken;
                break;
            }
        }

        if(!matchToken) return res.status(403).json({ message: "Invalid refresh token" });

        await prisma.refreshToken.delete({
            where: { id: matchToken.id }
        });

        const newAccess = generateAccessToken(payload.userId);
        const newRefresh = generateRefreshToken(payload.userId);
        const newHashed = await hashValue(newRefresh);

    await prisma.refreshToken.create({
      data: {
        tokenHash: newHashed,
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    setAccessCookies(res, newAccess);
    setRefreshCookies(res, newRefresh);

    res.json({ message: "Token refreshed" });
  } catch {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if(token) {
        const tokens = await prisma.refreshToken.findMany();

        for(const dbToken of tokens){
            const isMatch = await compareHash(token, dbToken.tokenHash);
            if(isMatch) {
                await prisma.refreshToken.delete({
                    where: { id: dbToken.id }
                });
                break;
            }
        }
    }

    clearAuthCookies(res);
    res.json({ message: "Logged out" });
};

export const getMe = async (req: Request, res: Response) => {
    if (!req.userId) {
  return res.status(401).json({ message: "Unauthorized" });
   }

    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });

    if(!user) return res.status(401).json({ message: "Unathorized" });

    res.json(user);
};