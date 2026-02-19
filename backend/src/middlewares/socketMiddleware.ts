import { Socket } from "socket.io";
import cookie from "cookie";
import { verifyAccessToken } from "../utils/tokens.js";

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
    const rawCookie = socket.handshake.headers.cookie;

    if(!rawCookie) return next(new Error("Unathorized"));

    const parsed = cookie.parse(rawCookie);
    const token = parsed.accessToken;

    if(!token) return next(new Error("Unathorized"));

    try {
        const payload = verifyAccessToken(token);
        socket.data.userId = payload.userId;
        next();
    } catch {
        next(new Error("Invalid token"));
    }
};