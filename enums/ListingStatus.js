export const ListingStatus = Object.freeze({
  AVAILABLE: 1,
  SOLD: 2,
  RENTED: 3,
  STOP_SELLING: 4,
  STOP_RENTING: 5
})

export const ListingStatusLabel = Object.freeze({
  [ListingStatus.AVAILABLE]: 'available',
  [ListingStatus.SOLD]: 'sold',
  [ListingStatus.RENTED]: 'rented',
  [ListingStatus.STOP_SELLING]: 'stop_selling',
  [ListingStatus.STOP_RENTING]: 'stop_renting'
})

export const ListingStatusColor = Object.freeze({
  [ListingStatus.AVAILABLE]: 'blue-600',
  [ListingStatus.SOLD]: 'red-600',
  [ListingStatus.RENTED]: 'red-600',
  [ListingStatus.STOP_SELLING]: 'red-600',
  [ListingStatus.STOP_RENTING]: 'red-600'
})
