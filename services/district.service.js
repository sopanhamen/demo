import { BaseService } from './base.service'

export class DistrictService extends BaseService {
    endpoint = 'districts'

    async exports() {
        const url = `${this.endpoint}/exports`
        return await this.http.post(url, {}, { responseType: 'blob' })
    }
}
