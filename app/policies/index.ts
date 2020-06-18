import { Policy } from './types'

export const canPublish = roles =>
  roles.map(i => i.name).includes(Policy.postPublish)
