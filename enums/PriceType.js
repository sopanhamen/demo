export const PriceType = Object.freeze({
  TOTAL: 1,
  METER: 2,
  SQUARE_METER: 3,
  MONTH: 4,
  HECTARE: 5
})

export const PriceTypeLabel = Object.freeze({
  [PriceType.TOTAL]: 'total',
  [PriceType.METER]: 'meter',
  [PriceType.SQUARE_METER]: 'square_meter',
  [PriceType.MONTH]: 'month',
  [PriceType.HECTARE]: 'hectare'
})
