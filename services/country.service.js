import { BaseService } from './base.service'

export class CountryService extends BaseService {
    endpoint = 'countries'

    async exports() {
        const url = `${this.endpoint}/exports`
        return await this.http.post(url, {}, { responseType: 'blob' })
    }
}
