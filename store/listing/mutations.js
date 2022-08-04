/* eslint-disable camelcase */
export default {
    SET_FEATURED(state, data) {
        state.featured = data
    },
    SET_RENT(state, data) {
        state.rents = data
    },
    SET_SALE(state, data) {
        state.sales = data
    },
    SET_RENT_OR_SALE(state, data) {
        state.rentOrSales = data
    },
    SET_DISPLAYING_LISTING(state, property) {
        state.displayingListing = property
    }
}
