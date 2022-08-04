export const NegotiationStatus = Object.freeze({
    CANCELED: 0,
    PENDING: 1,
    AGREED: 2,
    DISAGREED: 3
})

export const NegotiationStatusLabel = Object.freeze({
    [NegotiationStatus.CANCELED]: 'canceled',
    [NegotiationStatus.PENDING]: 'pending',
    [NegotiationStatus.AGREED]: 'agreed',
    [NegotiationStatus.DISAGREED]: 'disagreed'
})
