import { BaseService } from './base.service'

export class SettingService extends BaseService {
  endpoint = 'settings'

  async updateTheme(payload) {
    const { data } = await this.http.$put(`${this.endpoint}/theme`, payload)
    return data
  }

  async getTheme() {
    const response = await this.http.$get(`${this.endpoint}/theme`)
    return response
  }
}
