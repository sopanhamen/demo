export const DeedType = Object.freeze({
  HARD_LMA: 0,
  HARD_SPORADIC_REGISTRATION: 1,
  SOFT_CERTIFICATE_POSSESSION: 2,
  SOFT_LETTER_POSSESSION: 3,
  FEATHER_TITLE: 4,
  OTHERS: 5
})

export const DeedTypeLabel = Object.freeze({
  [DeedType.HARD_LMA]: 'hard_lmap',
  [DeedType.HARD_SPORADIC_REGISTRATION]: 'hard_sporadic_registration',
  [DeedType.SOFT_CERTIFICATE_POSSESSION]: 'soft_certificate_possession',
  [DeedType.SOFT_LETTER_POSSESSION]: 'soft_letter_possession',
  [DeedType.FEATHER_TITLE]: 'feather_title',
  [DeedType.OTHERS]: 'others'
})
