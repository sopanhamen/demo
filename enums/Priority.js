export const Priority = Object.freeze({
  VERY_HIGH: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
  VERY_LOW: 5
})

export const PriorityLabel = Object.freeze({
  [Priority.VERY_HIGH]: 'very_high',
  [Priority.HIGH]: 'high',
  [Priority.MEDIUM]: 'medium',
  [Priority.LOW]: 'low',
  [Priority.VERY_LOW]: 'very_low'
})
