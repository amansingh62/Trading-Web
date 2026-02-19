import http from "http";
import { env } from "../src/config/env.js";
import app from "./app.js";
import "./config/redis.js";
import { startPriceEngine } from "./modules/market/priceEngine.js";
import { initializeSocket } from "./sockets/socket.js";


const httpServer = http.createServer(app);

initializeSocket(httpServer);

startPriceEngine();


httpServer.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
