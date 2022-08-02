import { BaseService } from './base.service'

export class ClientPaymentService extends BaseService {
  endpoint = 'client-payments'

  async uploadDocument(clientPaymentId, documents) {
    return await this.http.post(
      `${this.endpoint}/${clientPaymentId}/upload-documents`,
      { documents }
    )
  }

  async downloadDocument(file) {
    return await this.http.get(file.file_url, { responseType: 'blob' })
  }

  async deleteDocument(clientPaymentId, fileId) {
    return await this.http.delete(
      `${this.endpoint}/${clientPaymentId}/documents/${fileId}`
    )
  }
}
