import { BaseService } from './base.service'

export class SiteInquiry extends BaseService {
    endpoint = 'site-inquiries'

    async getDetail(id) {
        const { data } = await this.find(id, {
            relations: 'property, property.assignee'
        })

        return data
    }
}
