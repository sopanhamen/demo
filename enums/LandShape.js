export const LandShape = Object.freeze({
    IRREGULAR: 1,
    REGULAR: 2,
    RECTANGULAR: 3,
    SQUARE: 4
})

export const LandShapeLabel = Object.freeze({
    [LandShape.IRREGULAR]: 'regular',
    [LandShape.REGULAR]: 'rectangular',
    [LandShape.RECTANGULAR]: 'irregular',
    [LandShape.SQUARE]: 'square'
})
