import { BaseService } from './base.service'

export class RoleService extends BaseService {
    endpoint = 'users/roles'

    async updateMultiple(roles) {
        return await this.http.$put(this.endpoint, { roles })
    }
}
