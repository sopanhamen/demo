import { BaseService } from './base.service'

export class PropertyTypeService extends BaseService {
    endpoint = 'property-types'

    async exports() {
        const url = `${this.endpoint}/exports`
        return await this.http.post(url, {}, { responseType: 'blob' })
    }
}
