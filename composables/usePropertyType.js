import { useStore } from '@nuxtjs/composition-api'

export default function usePropertyType() {
    const store = useStore()

    const findPropertyTypeIdByName = (name) => {
        if (!name) {
            return null
        }

        const propertyType =
            store.getters['propertyType/getPropertyTypeByName'](name)

        if (!propertyType) {
            return null
        }

        return propertyType.id
    }

    return {
        findPropertyTypeIdByName
    }
}
