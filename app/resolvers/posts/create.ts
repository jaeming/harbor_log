import { post as Post } from '../../config/prisma_client'
import { canPublish } from '../../policies/post'

export const postCreate = async (_, { input }, { user }) => {
  return Post.create({
    data: {
      ...input,
      published: canPublish(user) ? input.published : false,
      author: { connect: { id: user!.id } }
    },
    include: { author: true }
  })
}
