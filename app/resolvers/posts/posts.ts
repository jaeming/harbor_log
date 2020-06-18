import { post as Post } from '../../config/prisma_client'

export const posts = async (_, _args, ctx) => {
  const user = ctx.user
  return Post.findMany({
    include: { author: true }
  })
}
