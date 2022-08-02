import { form } from './-default'

export default {
  async storeNewProperty({ commit, getters, state }) {
    const property = { ...getters.getFormData }
    const { data } = await this.$service.property.create(property)

    commit('ADD_PROPERTY', {
      ...data,
      creator: state.auth ? state.auth.user : {}
    })

    return data
  },

  async editProperty({ commit }, id) {
    const relations = [
      'saleContact',
      'ownerContact',
      'images',
      'documents',
      'facilities',
      'assignee'
    ]

    const { data } = await this.$service.property.find(id, {
      relations: relations.join(',')
    })

    const property = {
      ...data,
      other_facilities: data.other_facilities
        ? data.other_facilities.map((i) => i.id)
        : [],
      owner_contact: data.owner_contact || form.owner_contact,
      sale_contact: data.sale_contact || form.sale_contact
    }

    commit('SET_PROPERTY_FORM', { ...property })

    return property
  },

  async findProperty({ commit }, id) {
    const relations = [
      'saleContact',
      'ownerContact',
      'images',
      'documents',
      'facilities',
      'assignee',
      'propertyType',
      'developer',
      'project'
    ]

    const { data } = await this.$service.property.find(id, {
      relations: relations.join(',')
    })

    const property = {
      ...data,
      owner_contact: data.owner_contact || form.owner_contact,
      sale_contact: data.sale_contact || form.sale_contact
    }

    commit('SET_SELECTED_PROPERTY', { ...property })

    return property
  },

  async updateProperty({ commit, getters }) {
    const property = getters.getFormData
    const { data } = await this.$service.property.update(property.id, property)
    commit('UPDATE_PROPERTY', data)

    return data
  },

  async deleteImage({ commit }, { propertyId, image }) {
    commit('REMOVE_PROPERTY_FORM_IMAGE', image)

    if (!image.id || !propertyId) {
      return false
    }

    return await this.$service.property.deleteImage(propertyId, image.id)
  },

  async deleteDocument({ commit }, { propertyId, file }) {
    commit('REMOVE_PROPERTY_FORM_DOCUMENT', file)

    if (!file.id || !propertyId) {
      return false
    }

    return await this.$service.property.deleteDocument(propertyId, file.id)
  }
}
