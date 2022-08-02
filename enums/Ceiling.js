export const Ceiling = Object.freeze({
  SUSPENDED_CEILING: 0,
  SMART_BOARD: 1,
  PLASTERED_CONCRETE: 2,
  METAL: 3,
  HARDWOOD: 4,
  LAMINATED_WOOD: 5
})

export const CeilingLabel = Object.freeze({
  [Ceiling.SUSPENDED_CEILING]: 'suspended_ceiling',
  [Ceiling.SMART_BOARD]: 'smart_board',
  [Ceiling.PLASTERED_CONCRETE]: 'plastered_concrete',
  [Ceiling.METAL]: 'metal',
  [Ceiling.HARDWOOD]: 'hardwood',
  [Ceiling.LAMINATED_WOOD]: 'laminated_wood'
})
