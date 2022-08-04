import { BaseService } from './base.service'

export class ListingService extends BaseService {
    endpoint = 'listings'

    async getSummaries() {
        return await this.http.$get(`${this.endpoint}/summaries`)
    }

    async getDetail(id) {
        const { data } = await this.find(id, {
            relations:
                'property_type,images,facilities,assignee,assignee.profile,assignee.profile.contact'
        })

        return data
    }
}
