// eslint-disable-next-line no-unused-vars
import { Policy } from './types'

export class PolicyPost {
  user

  constructor (user) {
    this.user = user
  }

  get write () {
    return !this.guest && this.can(Policy.postWrite)
  }

  get publish () {
    return this.can(Policy.postPublish)
  }

  get guest () {
    return !this.user
  }

  private can (policy: Policy) {
    return this.user.admin || this.user.roles.map(i => i.name).includes(policy)
  }
}

export const canPublish = (user) => {
  return new PolicyPost(user).publish
}
