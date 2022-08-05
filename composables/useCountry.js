import { useStore } from '@nuxtjs/composition-api'

export default function useCountry() {
    const store = useStore()

    const findCountryIdByName = (name) => {
        if (!name) {
            return null
        }

        const country = store.getters['country/getCountryByName'](name)
        if (!country) {
            return null
        }

        return country.id
    }

    const findCountryByName = (name) => {
        if (!name) {
            return null
        }

        const country = store.getters['country/getCountryByName'](name)
        if (!country) {
            return null
        }

        return country
    }

    return {
        findCountryIdByName,
        findCountryByName
    }
}
