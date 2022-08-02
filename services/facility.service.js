import { BaseService } from './base.service'

export class FacilityService extends BaseService {
  endpoint = 'facilities'

  async exports() {
    const url = `${this.endpoint}/exports`
    return await this.http.post(url, {}, { responseType: 'blob' })
  }
}
