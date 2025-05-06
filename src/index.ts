import { logger } from "./common/logger/logger.factory";
import { AppInitializer } from "./core/startup";

async function bootstrap() {
  try {
    const app = await AppInitializer.initialize();
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();
