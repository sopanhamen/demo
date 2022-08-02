import { BaseService } from './base.service'

export class ProjectService extends BaseService {
  endpoint = 'projects'

  async exports() {
    const url = `${this.endpoint}/exports`
    return await this.http.post(url, {}, { responseType: 'blob' })
  }
}
