export const ElectricitySupply = Object.freeze({
  NONE: 0,
  PUBLIC: 1,
  PRIVATE: 2
})

export const ElectricitySupplyLabel = Object.freeze({
  [ElectricitySupply.NONE]: 'none',
  [ElectricitySupply.PUBLIC]: 'public',
  [ElectricitySupply.PRIVATE]: 'private'
})
