import { post as Post, Permission } from '../../config/prisma_client'

export const postUpdate = (_, { input, id }, { user }) => {
  if (!user) return

  const published = user.roles.includes(Permission.postPublish)
    ? input.published
    : false

  return Post.update({
    where: { id },
    data: {
      ...input,
      published
    },
    include: { author: true }
  })
}
