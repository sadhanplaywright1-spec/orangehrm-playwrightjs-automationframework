const env =
process.env.ENV || 'qa';
module.exports = require(`../../config/environments/${env}.json`);