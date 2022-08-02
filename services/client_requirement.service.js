import { BaseService } from './base.service'

export class ClientRequirementService extends BaseService {
  endpoint = 'client-requirements'

  async close(requirement) {
    return await this.http.$post(`${this.endpoint}/${requirement.id}/complete`)
  }

  async cancel(requirement) {
    return await this.http.$post(`${this.endpoint}/${requirement.id}/cancel`)
  }
}
