import { BaseService } from './base.service'

export class DeveloperService extends BaseService {
  endpoint = 'developers'

  async exports() {
    const url = `${this.endpoint}/exports`
    return await this.http.post(url, {}, { responseType: 'blob' })
  }
}
