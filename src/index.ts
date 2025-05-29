import { logger } from './common/logger/logger.factory';
import { AppInitializer } from './core/startup';

async function startServer() {
    try {
        const app = await AppInitializer.initialize();
        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`, {
                service: 'Index',
            });
        });
    } catch (error) {
        logger.error('Failed to start server:', error, { service: 'Index' });
        process.exit(1);
    }
}

startServer();
