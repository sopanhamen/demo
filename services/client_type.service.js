import { BaseService } from './base.service'

export class ClientTypeService extends BaseService {
    endpoint = 'client-types'

    async exports() {
        const url = `${this.endpoint}/exports`
        return await this.http.post(url, {}, { responseType: 'blob' })
    }
}
