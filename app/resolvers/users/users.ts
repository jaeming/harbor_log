import { user as User } from '../../config/prisma_client'

export const users = () => {
  return User.findMany({
    include: {
      posts: { include: { author: true } },
      profile: true
    }
  })
}
