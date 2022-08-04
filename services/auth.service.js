import { BaseService } from './base.service'

export class AuthService extends BaseService {
    endpoint = 'auth'

    async getPermissions() {
        return await this.http.$get(`${this.endpoint}/permissions`)
    }

    async updatePersonalProfile(data) {
        return await this.http.$put(`${this.endpoint}/update-profile`, data)
    }
}
