import { useStore } from '@nuxtjs/composition-api'

export default function useCompany() {
    const { getters } = useStore()

    const findCompanyById = (id) => {
        if (!id) {
            return null
        }

        const company = getters['company/getCompanyById'](id)
        if (!company) {
            return null
        }

        return company
    }

    return {
        findCompanyById
    }
}
