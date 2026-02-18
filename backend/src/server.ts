import { env } from "../src/config/env.js"

import app from "./app.js";

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
