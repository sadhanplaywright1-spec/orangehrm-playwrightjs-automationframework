class ApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
  }

  post(path, data) {
    return this.request.post(path, { data });
  }

  get(path) {
    return this.request.get(path);
  }

  delete(path) {
    return this.request.delete(path);
  }

  async createEmployee(payload) {
    return this.post('/web/index.php/api/v2/pim/employees', payload);
  }

  async getEmployees() {
    return this.get('/web/index.php/api/v2/pim/employees?limit=10&offset=0');
  }

  async getEmployee(id) {
    return this.get(`/web/index.php/api/v2/pim/employees/${id}`);
  }

  async deleteEmployee(id) {
    return this.request.delete('/web/index.php/api/v2/pim/employees', {
      data: { ids: [Number(id)] },
    });
  }
}
module.exports = ApiClient;

