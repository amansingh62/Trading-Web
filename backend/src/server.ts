import { env } from "../src/config/env.js";
import app from "./app.js";
import "./config/redis.js";
import { startPriceEngine } from "./modules/market/priceEngine.js";

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

  startPriceEngine();
