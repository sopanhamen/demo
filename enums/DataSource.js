export const DataSource = Object.freeze({
  OWNER: 1,
  AGENT: 2,
  BROKER: 3
})

export const DataSourceLabel = Object.freeze({
  [DataSource.OWNER]: 'owner',
  [DataSource.AGENT]: 'agent',
  [DataSource.BROKER]: 'broker'
})
