import { user as User } from '../../config/prisma_client'
import { Policy } from '../../policies/types'
import { sign } from '../../authentication'

export const userCreate = async (_, { input }) => {
  const user = await User.create({
    data: {
      ...input,
      roles: {
        create: [{ name: Policy.commentRead }, { name: Policy.commentWrite }]
      }
    }
  })
  if (user) return sign(user)
}
