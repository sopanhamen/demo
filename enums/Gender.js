export const Gender = Object.freeze({
    NOT_SPECIFIED: 0,
    FEMALE: 1,
    MALE: 2,
    OTHER: 3
})

export const GenderLabel = Object.freeze({
    [Gender.NOT_SPECIFIED]: 'not_specified',
    [Gender.FEMALE]: 'female',
    [Gender.MALE]: 'male',
    [Gender.OTHER]: 'other'
})
