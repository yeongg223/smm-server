import app from "./app";
import { env } from "./lib/dot-env";
import { initializeDatabase } from "./lib/prisma";

initializeDatabase().then(() => {
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
});
