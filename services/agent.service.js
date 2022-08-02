import { BaseService } from './base.service'

export class AgentService extends BaseService {
  endpoint = 'agents'

  async getDetail(id) {
    const { data } = await this.find(id, {
      relations:
        'assignee.profile.contact, profile, teams, teams.branch, publishedProperties'
    })

    return data
  }
}
