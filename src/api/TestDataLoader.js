const path = require('path');
class TestDataLoader {
static getEmployeeData(projectName) {
const env = projectName.toLowerCase();
return require(
path.join(
process.cwd(),
'src',
'api',
'apitestdata',
env,
'employee.json'
)
);
}
}
module.exports = TestDataLoader;