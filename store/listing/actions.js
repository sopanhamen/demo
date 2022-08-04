import { ListingPurpose } from '@/enums/ListingPurpose'

export default {
    async fetchSummaries({ commit }) {
        const response = await this.$service.listing.getSummaries()
        const { data, featured } = response

        commit('SET_FEATURED', featured)

        const forRents = data.find(
            (i) => i.listing_purpose === ListingPurpose.RENT
        )
        commit('SET_RENT', forRents || { latests: [], counts: {} })

        const forSales = data.find(
            (i) => i.listing_purpose === ListingPurpose.SALE
        )
        commit('SET_SALE', forSales || { latests: [], counts: {} })

        const forRentsOrSales = data.find(
            (i) => i.listing_purpose === ListingPurpose.RENT_OR_SALE
        )
        commit(
            'SET_RENT_OR_SALE',
            forRentsOrSales || { latests: [], counts: {} }
        )
    },

    async fetchDetail({ commit }, id) {
        const data = await this.$service.listing.getDetail(id)

        commit('SET_DISPLAYING_LISTING', data)

        return data
    }
}
