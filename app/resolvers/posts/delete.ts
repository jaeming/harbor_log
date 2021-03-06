import { post as Post } from '../../config/prisma_client'

export const postDelete = async (_, { id }, { user }) => {
  if (!user) return
  if (!user.admin) { // untested code
    const post = await Post.findOne({ where: { id } })
    if (post?.authorId !== user.id) return // untested code
  }

  return Post.delete({ where: { id } })
}
