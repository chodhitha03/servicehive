import { app } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { logger } from "./config/logger";

const start = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      logger.info(`Backend running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    logger.error("Failed to start server", { error });
    process.exit(1);
  }
};

void start();