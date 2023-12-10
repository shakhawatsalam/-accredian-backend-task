import { Server } from 'http';
import app from './app';
import config from './config';
import { console, errorconsole } from './shared/console.log';

async function bootstrap() {
  const server: Server = app.listen(config.port, () => {
    console.log.info(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log.info('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    errorconsole.log.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
