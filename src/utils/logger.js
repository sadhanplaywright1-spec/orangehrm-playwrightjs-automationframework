const winston = require('winston');
const path = require('path');
const fs = require('fs');
// Create logs folder if it doesn't exist
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
fs.mkdirSync(logDir, { recursive: true });
}
const logger = winston.createLogger({
level: 'info',
format: winston.format.combine(
winston.format.timestamp({
format: 'YYYY-MM-DD HH:mm:ss'
}),
winston.format.printf(({ timestamp, level, message }) => {
return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
})
),
transports: [
new winston.transports.File({
filename: path.join(logDir, 'application.log')
}),
new winston.transports.Console()
]
});
module.exports = logger;