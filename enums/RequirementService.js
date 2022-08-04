export const RequirementService = Object.freeze({
    BUY: 0,
    SELL: 2,
    RENT: 1,
    OFFER_RENTING: 3,
    VALUATE: 4,
    CONSULT: 5
})

export const RequirementServiceLabel = Object.freeze({
    [RequirementService.BUY]: 'buy',
    [RequirementService.SELL]: 'sell',
    [RequirementService.RENT]: 'rent',
    [RequirementService.OFFER_RENTING]: 'offer_renting',
    [RequirementService.VALUATE]: 'valuate',
    [RequirementService.CONSULT]: 'consult'
})
