const BaseApi = require('./BaseApi');
class EmployeeApi extends BaseApi {
async getEmployee(url) {
return super.get(url);
}
async createEmployee(url, payload) {
return super.post(url, payload);
}
async updateEmployee(url, payload) {
return super.put(url, payload);
}
async patchEmployee(url, payload) {
return super.patch(url, payload);
}
async deleteEmployee(url) {
return super.delete(url);
}
}
module.exports = EmployeeApi;