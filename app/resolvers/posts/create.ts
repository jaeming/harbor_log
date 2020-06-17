import { post as Post } from '../../config/prisma_client'
import { Policy } from '../../policies/types'

export const postCreate = async (_, { input }, { user }) => {
  return Post.create({
    data: {
      ...input,
      published: user.roles.includes(Policy.postPublish) ? input.published : false,
      author: { connect: { id: user!.id } }
    },
    include: { author: true }
  })
}
