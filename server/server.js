require('dotenv').config({ debug: true });
const app = require('./app');
const config = require('./config/env');
const logger = require('./utils/logger');
const db = require('./config/db');

// Test DB connection
// DB test commented - create DB first
// db.getConnection().then(connection => {
//   logger.info('DB connected');
//   connection.release();
// }).catch(err => logger.error('DB connection failed: ' + err));


const server = app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
});

