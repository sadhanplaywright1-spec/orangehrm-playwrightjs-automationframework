class UserCollection {
    constructor(request) {
        this.request = request;
    }
    async getUser(userId) {
        return await this.request.get(`/api/users/${userId}`);
    }
    async createUser(payload) {
        return await this.request.post('/api/users', {
            data: payload
        });
    }
    async updateUser(userId, payload) {
        return await this.request.put(`/api/users/${userId}`, {
            data: payload
        });
    }
    async deleteUser(userId) {
        return await this.request.delete(`/api/users/${userId}`);
    }
}
module.exports = UserCollection;