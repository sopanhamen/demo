import { useStore } from '@nuxtjs/composition-api'

export default function useProvince() {
    const { store } = useStore()

    const findProvinceIdByName = (name, countryId) => {
        if (!name) {
            return null
        }

        const province = store.getters['province/getProvinceByName'](
            name,
            countryId
        )

        if (!province) {
            return null
        }

        return province.id
    }

    return { findProvinceIdByName }
}
