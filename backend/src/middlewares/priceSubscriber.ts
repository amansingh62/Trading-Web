import { Server } from "socket.io";
import { sub } from "../config/redis.js";


interface PricePayload {
    symbol: string,
    price: number,
    timestamp: number,
};

export const initializePriceSubscriber = (io: Server) => {
    sub.subscribe("PRICE_UPDATES");

    sub.on("message", (channel: string, message: string) => {
        if(channel === "PRICE_UPDATES") {
            const data: PricePayload = JSON.parse(message);

            io.emit("priceUpdate", data);
        }
    });
};