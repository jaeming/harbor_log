import { post as Post } from '../../config/prisma_client'

export const posts = async () => {
  return Post.findMany({
    include: { author: true }
  })
}
