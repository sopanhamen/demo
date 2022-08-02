import { getField } from 'vuex-map-fields'
import { ListingPurpose } from '@/enums/ListingPurpose'

function findPropertyCountFromState(state, propertyTypeGroup) {
  if (!state || !state.counts || !Array.isArray(state.counts)) {
    return 0
  }

  const item = state.counts.find(
    (i) => i.property_type_group === propertyTypeGroup
  )

  if (!item) {
    return 0
  }

  return item.counts
}

export default {
  getProperties: (state) => state.properties,
  getRents: (state) => state.rents,
  getSales: (state) => state.sales,
  getRentOrSales: (state) => state.rentOrSales,
  getPropertyCounts: (state) => (propertyTypeGroup, listingPurpose) => {
    if (listingPurpose === ListingPurpose.RENT) {
      return findPropertyCountFromState(state.rents, propertyTypeGroup)
    }

    if (listingPurpose === ListingPurpose.SALE) {
      return findPropertyCountFromState(state.sales, propertyTypeGroup)
    }

    if (listingPurpose === ListingPurpose.RENT_OR_SALE) {
      return findPropertyCountFromState(state.rentOrSales, propertyTypeGroup)
    }

    return null
  },
  getField
}
