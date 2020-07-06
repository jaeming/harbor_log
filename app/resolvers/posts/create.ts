import { post as Post, Permission } from '../../config/prisma_client'

export const postCreate = (_, { input }, { user }) => {
  if (!user) return

  const published = user.roles.includes(Permission.postPublish) ? input.published : false

  return Post.create({
    data: {
      ...input,
      published,
      author: { connect: { id: user!.id } }
    },
    include: { author: true }
  })
}
