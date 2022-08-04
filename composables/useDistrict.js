import { useStore } from '@nuxtjs/composition-api'

export default function useDistrict() {
    const { store } = useStore()

    const findDistrictIdByName = (name, provinceId) => {
        if (!name) {
            return null
        }

        const district = store.getters['district/getDistrictByName'](
            name,
            provinceId
        )

        if (!district) {
            return null
        }

        return district.id
    }

    return {
        findDistrictIdByName
    }
}
