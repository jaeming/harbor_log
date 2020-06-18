import { post as Post } from '../../config/prisma_client'
import { canPublish } from '../../policies'

export const postCreate = (_, { input }, { user }) => {
  if (!user) return

  return Post.create({
    data: {
      ...input,
      published: canPublish(user.roles) ? input.published : false,
      author: { connect: { id: user!.id } }
    },
    include: { author: true }
  })
}
