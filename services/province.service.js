import { BaseService } from './base.service'

export class ProvinceService extends BaseService {
    endpoint = 'provinces'

    async exports() {
        const url = `${this.endpoint}/exports`
        return await this.http.post(url, {}, { responseType: 'blob' })
    }
}
