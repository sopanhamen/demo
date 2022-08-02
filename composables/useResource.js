import { computed, useStore } from '@nuxtjs/composition-api'

export default function useResource() {
  const store = useStore()

  const fetchResources = async (force = false) => {
    try {
      store.commit('resource/UPDATE_STATUS', 'fetching')

      if (force) {
        resetResources()
      }

      if (store.state.resource.totalResource === 0) {
        await store.dispatch('resource/fetchStaticResources')
      }

      const dynamicResources = [
        'client_types',
        'development_types',
        'property_types',
        'developers',
        'facilities',
        'companies',
        'company_branches'
      ]

      if (force || store.state.country.countries.length === 0) {
        dynamicResources.push('countries')
      }

      if (force || store.state.province.provinces.length === 0) {
        dynamicResources.push('provinces')
      }

      if (force || store.state.district.districts.length === 0) {
        dynamicResources.push('districts')
      }

      if (force || store.state.commune.communes.length === 0) {
        dynamicResources.push('communes')
      }

      const res = await store.dispatch(
        'resource/fetchDynamicResources',
        dynamicResources
      )

      if (res) {
        store.commit('resource/UPDATE_STATUS', 'success')
      }
    } catch (error) {
      store.commit('resource/UPDATE_STATUS', 'failed')
    }
  }

  const status = computed(() => {
    return store.state.resource.status
  })

  const resetResources = () => {
    store.commit('crud/CLEAR_ALL_DATA')
    store.commit('user/ClEAR_ALL_DATA')
    store.commit('userTeam/ClEAR_ALL_DATA')
    store.commit('property/ClEAR_ALL_DATA')
    store.commit('client/CLEAR_CLIENT_FORM')
    store.commit('project/CLEAR_PROJECT_FORM')
    store.commit('role/CLEAR_ROLE_FORM')
    store.commit('country/CLEAR_COUNTRY_FORM')
    store.commit('province/CLEAR_PROVINCE_FORM')
    store.commit('district/CLEAR_DISTRICT_FORM')
    store.commit('commune/CLEAR_COMMUNE_FORM')
    store.commit('clientType/CLEAR_CLIENT_TYPE_FORM')
    store.commit('propertyType/CLEAR_PROPERTY_TYPE_FORM')
    store.commit('developmentType/CLEAR_DEVELOPMENT_TYPE_FORM')
    store.commit('developer/CLEAR_DEVELOPER_FORM')
    store.commit('dashboard/CLEAR_DASHBOARD_FILTER')
  }

  return { fetchResources, resetResources, status }
}
