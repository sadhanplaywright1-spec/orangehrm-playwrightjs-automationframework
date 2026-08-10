const pino = require('pino');

let logger;

try {
  logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: { target: 'pino-pretty', options: { colorize: false } },
  });
} catch (error) {
  logger = pino({ level: process.env.LOG_LEVEL || 'info' });
}

module.exports = logger;
