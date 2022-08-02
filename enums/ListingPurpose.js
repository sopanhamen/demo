export const ListingPurpose = Object.freeze({
  SALE: 1,
  RENT: 2,
  RENT_OR_SALE: 3
})

export const ListingPurposeLabel = Object.freeze({
  [ListingPurpose.SALE]: 'sale',
  [ListingPurpose.RENT]: 'rent',
  [ListingPurpose.RENT_OR_SALE]: 'rent_or_sale'
})

export const ListingPurposeColor = Object.freeze({
  [ListingPurpose.SALE]: 'bg-green-500/90',
  [ListingPurpose.RENT]: 'bg-red-500/90',
  [ListingPurpose.RENT_OR_SALE]: 'bg-indigo-400/90'
})
