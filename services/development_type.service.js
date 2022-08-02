import { BaseService } from './base.service'

export class DevelopmentTypeService extends BaseService {
  endpoint = 'development-types'

  async exports() {
    const url = `${this.endpoint}/exports`
    return await this.http.post(url, {}, { responseType: 'blob' })
  }
}
