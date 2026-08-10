class EmployeeService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async createEmployee(payload) {
    const response = await this.apiClient.post('/api/employees', payload);
    return response;
  }

  async getEmployee(id) {
    return this.apiClient.get(`/api/employees/${id}`);
  }

  async deleteEmployee(id) {
    return this.apiClient.delete(`/api/employees/${id}`);
  }
}

module.exports = EmployeeService;
