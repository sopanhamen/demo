import { BaseService } from './base.service'

export class CommuneService extends BaseService {
  endpoint = 'communes'

  async exports() {
    const url = `${this.endpoint}/exports`
    return await this.http.post(url, {}, { responseType: 'blob' })
  }
}
