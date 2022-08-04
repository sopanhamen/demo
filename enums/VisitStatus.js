export const VisitStatus = Object.freeze({
    CANCELED: 0,
    PENDING: 1,
    VISITED: 2
})

export const VisitStatusLabel = Object.freeze({
    [VisitStatus.CANCELED]: 'canceled',
    [VisitStatus.PENDING]: 'pending',
    [VisitStatus.VISITED]: 'visited'
})
