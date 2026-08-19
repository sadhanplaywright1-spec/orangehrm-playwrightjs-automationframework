const ApiClient = require('../../models/ApiClient');
class EmployeeCollection {
async createEmployee(payload) {
const apiContext =
await ApiClient.createContext();
return await apiContext.post(
'/api/v2/pim/employees',
{
data: payload
}
);
}
async getEmployee(employeeId) {
const apiContext =
await ApiClient.createContext();
return await apiContext.get(
`/api/v2/pim/employees/${employeeId}`
);
}
async updateEmployee(employeeId, payload) {
const apiContext =
await ApiClient.createContext();
return await apiContext.patch(
`/api/v2/pim/employees/${employeeId}`,
{
data: payload
}
);
}
async deleteEmployee(employeeId) {
const apiContext =
await ApiClient.createContext();
return await apiContext.delete(
`/api/v2/pim/employees/${employeeId}`
);
}
}
module.exports = new EmployeeCollection();