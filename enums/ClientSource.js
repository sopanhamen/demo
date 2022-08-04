export const ClientSource = Object.freeze({
    WALK_IN: 0,
    THIRD_PARTY: 1,
    WEBSITE: 2,
    BANNER_RAISING: 3,
    OTHER_ADVERTISING: 4,
    FACEBOOK: 5,
    GOOGLE_MAP: 6,
    KHMER24: 7,
    CVEA: 8,
    REALESTATE_COM_KH: 9
})

export const ClientSourceLabel = Object.freeze({
    [ClientSource.WALK_IN]: 'walk_in',
    [ClientSource.THIRD_PARTY]: 'third_party',
    [ClientSource.WEBSITE]: 'website',
    [ClientSource.BANNER_RAISING]: 'banner_raising',
    [ClientSource.OTHER_ADVERTISING]: 'other_advertising',
    [ClientSource.FACEBOOK]: 'facebook',
    [ClientSource.GOOGLE_MAP]: 'google_map',
    [ClientSource.KHMER24]: 'khmer24',
    [ClientSource.CVEA]: 'cvea',
    [ClientSource.REALESTATE_COM_KH]: 'realestate_com_kh'
})
