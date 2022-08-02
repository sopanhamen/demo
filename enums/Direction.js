export const Direction = Object.freeze({
  UNKNOWN: 0,
  NORTH: 1,
  EAST: 2,
  WEST: 3,
  SOUTH: 4,
  NORTH_EAST: 5,
  SOUTH_EAST: 6,
  NORTH_WEST: 7,
  SOUTH_WEST: 8
})

export const DirectionLabel = Object.freeze({
  [Direction.UNKNOWN]: 'unknown',
  [Direction.NORTH]: 'north',
  [Direction.EAST]: 'east',
  [Direction.WEST]: 'west',
  [Direction.SOUTH]: 'south',
  [Direction.NORTH_EAST]: 'north_east',
  [Direction.SOUTH_EAST]: 'south_east',
  [Direction.NORTH_WEST]: 'north_west',
  [Direction.SOUTH_WEST]: 'south_west'
})
