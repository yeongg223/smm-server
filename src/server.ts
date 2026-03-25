import app from "./app";
import { env } from "./lib/dot-env";
import { initializeDatabase } from "./lib/prisma";

process.on("unhandledRejection", (err) => {
  console.error("🔥 UNHANDLED Promise Error:", err);
});

process.on("uncaughtException", (err) => {
  console.error("🔥 UNHANDLED Eror:", err);
});

initializeDatabase().then(() => {
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
});
