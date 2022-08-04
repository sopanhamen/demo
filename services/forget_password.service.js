import { BaseService } from './base.service'

export class ForgetPassword extends BaseService {
    endpoint = 'forget-password'

    async sendResetLink(payload) {
        return await this.http.$post(this.endpoint, payload)
    }
}
