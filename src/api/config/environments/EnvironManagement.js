const env = process.env.ENV || 'qa';
const environments = {
qa: require('../api/config/environments/qa.json'),
uat: require('../api/config/environments/uat.json'),
staging: require('../api/config/environments/staging.json')
};
module.exports = {
...environments[env],
currentEnv: env
};