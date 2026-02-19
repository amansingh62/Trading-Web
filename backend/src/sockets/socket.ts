import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { env } from "../config/env.js";
import { socketAuthMiddleware } from "../middlewares/socketMiddleware.js";
import { initializePriceSubscriber } from "../middlewares/priceSubscriber.js";


export const initializeSocket = (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: env.FRONTEND,
            credentials: true
        }
    });

    io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {
        console.log("User connected:", socket.data.userId);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.data.userId);
        });
    });

    initializePriceSubscriber(io);

    return io;
}