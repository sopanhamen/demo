import { BaseService } from './base.service'

export class PropertyService extends BaseService {
    endpoint = 'properties'

    async getDocuments(property) {
        const { data } = await this.http.get(
            `${this.endpoint}/${property.id}/documents`
        )
        return data
    }

    async downloadDocument(property, document) {
        const { data } = await this.http.get(
            `${this.endpoint}/${property.id}/documents/${document.id}`
        )
        return data
    }

    async exportSample() {
        const url = `${this.endpoint}/sample-excel`
        return await this.http.post(url, {}, { responseType: 'blob' })
    }

    async getContacts(property) {
        const { data } = await this.http.get(
            `${this.endpoint}/${property.id}/contacts`
        )
        return data
    }

    async deleteImage(propertyId, imageId) {
        return await this.http.delete(
            `${this.endpoint}/${propertyId}/image/${imageId}`
        )
    }

    async deleteDocument(propertyId, fileId) {
        return await this.http.delete(
            `${this.endpoint}/${propertyId}/document/${fileId}`
        )
    }

    async approve(propertyId) {
        return await this.http.post(`${this.endpoint}/${propertyId}/approve`)
    }

    async publish(propertyId) {
        return await this.http.post(`${this.endpoint}/${propertyId}/publish`)
    }

    async transfer(properties) {
        const { data } = await this.http.post(
            `${this.endpoint}/transfer`,
            properties
        )
        return data
    }
}
