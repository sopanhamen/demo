export const RequirementResult = Object.freeze({
  IN_PROGRESS: 0,
  PENDING: 1,
  FAILED: 2,
  SUCCESS: 3,
  CANCELLED: 4
})

export const RequirementResultLabel = Object.freeze({
  [RequirementResult.IN_PROGRESS]: 'in_progress',
  [RequirementResult.PENDING]: 'pending',
  [RequirementResult.FAILED]: 'failed',
  [RequirementResult.SUCCESS]: 'success',
  [RequirementResult.CANCELLED]: 'cancelled'
})
