import { BaseService } from './base.service'

export class UserService extends BaseService {
  endpoint = 'users'

  async getTeammates() {
    return await this.http.$get(`${this.endpoint}/teammates`)
  }

  async getDetail(id) {
    const { data } = await this.find(id, {
      relations: 'profile, profile.contact'
    })

    return data
  }

  async getVerify(email) {
    const { data } = await this.http.$get(`/verify?user=${email}`)

    return data
  }
}
