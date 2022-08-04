export const Zoning = Object.freeze({
    RESIDENTIAL: 1,
    RESIDENTIAL_COMMERCIAL: 2,
    INDUSTRIAL: 3,
    AGRICULTURAL: 4,
    COMMERCIAL: 5,
    HISTORIC: 6,
    UNUSED_LAND: 7
})

export const ZoningLabel = Object.freeze({
    [Zoning.RESIDENTIAL]: 'residential',
    [Zoning.RESIDENTIAL_COMMERCIAL]: 'residential_commercial',
    [Zoning.INDUSTRIAL]: 'industrial',
    [Zoning.AGRICULTURAL]: 'agricultural',
    [Zoning.COMMERCIAL]: 'commercial',
    [Zoning.HISTORIC]: 'historic',
    [Zoning.UNUSED_LAND]: 'unused_land'
})
