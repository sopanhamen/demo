import { useStore } from '@nuxtjs/composition-api'

export default function useCommune() {
  const store = useStore()

  const findCommuneIdByName = (name, districtId) => {
    if (!name) {
      return null
    }

    const commune = store.getters['commune/getCommuneByName'](name, districtId)
    if (!commune) {
      return null
    }

    return commune.id
  }

  return {
    findCommuneIdByName
  }
}
