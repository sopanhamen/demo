import { useStore } from '@nuxtjs/composition-api'

export default function useCommune() {
    const store = useStore()

    const findCommuneIdByName = (name, districtId) => {
        if (!name) return null
    }

    return {
        fetchCommune
    }
}
