import { post as Post } from '../../config/prisma_client'

export const post = (_, { id }) => {
  return Post.findOne({
    where: { id },
    include: { author: true }
  })
}
