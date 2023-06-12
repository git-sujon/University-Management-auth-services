import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { infoLogger, errorLogger } from './shared/logger';
import { Server } from 'http';
const port = config.port;

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function connectToMongoDB() {
  try {
    await mongoose.connect(`${config.database_url}`);
    infoLogger.info('Database Connection Successfully');

    server = app.listen(port, () => {
      infoLogger.info(`listening on port ${port}`);
    });
  } catch (error) {
    errorLogger.error('Database connection Error:', error);
  }

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection , Server is closed...');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
      });
    }
  });
}

connectToMongoDB().catch(err => errorLogger.error(err));

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
