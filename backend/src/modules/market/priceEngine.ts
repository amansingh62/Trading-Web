import { pub } from "../../config/redis.js";

let price = 100;

export const startPriceEngine = () => {
    setInterval(async () => {
        const change = (Math.random() - 0.5) * 2;
        price = +(price + change).toFixed(2);

        const payload = {
            symbol: "AMAN",
            price,
            timestamp: Date.now()
        };

        await pub.set("AMAN:PRICE", JSON.stringify(payload));

        await pub.publish("PRICE_UPDATES", JSON.stringify(payload));

        console.log("Price Update:", payload);
    }, 1000);
};