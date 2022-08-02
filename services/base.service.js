import queryString from 'query-string'
export class BaseService {
  http = undefined
  endpoint = '/'

  constructor($axios) {
    this.http = $axios
  }

  async paginate(params = {}) {
    if (params.trashed === true) {
      return this.paginateTrash(params)
    }

    return await this.http.$get(this.endpoint, {
      params: { ...params },
      paramsSerializer: (params) => {
        return queryString.stringify(params, { arrayFormat: 'comma' })
      }
    })
  }

  async paginateTrash(params = {}) {
    return await this.http.$get(`${this.endpoint}/trash`, {
      params: { ...params },
      paramsSerializer: (params) => {
        return queryString.stringify(params, { arrayFormat: 'comma' })
      }
    })
  }

  async get(params = {}) {
    return await this.http.$get(this.endpoint, {
      params: { ...params, no_pagination: true },
      paramsSerializer: (params) => {
        return queryString.stringify(params, { arrayFormat: 'comma' })
      }
    })
  }

  async find(value, params = {}) {
    return await this.http.$get(`${this.endpoint}/${value}`, {
      params,
      paramsSerializer: (params) => {
        return queryString.stringify(params, { arrayFormat: 'comma' })
      }
    })
  }

  async search(column, value, params = {}) {
    return await this.http.$get(`${this.endpoint}`, {
      params: {
        limit: 5,
        ...params,
        [column]: value,
        filter_options: `${column}:contain`,
        no_pagination: true
      },
      paramsSerializer: (params) => {
        return queryString.stringify(params, { arrayFormat: 'comma' })
      }
    })
  }

  async create(payload) {
    return await this.http.$post(this.endpoint, payload)
  }

  async createMany(payload) {
    return await this.http.$post(`${this.endpoint}/create-many`, payload)
  }

  async update(value, payload) {
    return await this.http.$put(`${this.endpoint}/${value}`, payload)
  }

  async delete(value) {
    return await this.http.$delete(`${this.endpoint}/${value}`)
  }

  async restore(value, data) {
    return await this.http.$post(`${this.endpoint}/${value}/restore`, data)
  }
}
