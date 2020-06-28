import { user as User } from '../../config/prisma_client'
import { Policy } from '../../policies/types'
import { sign, salt } from '../../authentication'

const DEFAULT_POLICIES = [
  { name: Policy.commentRead },
  { name: Policy.commentWrite }
]

export const register = async (_, { input }) => {
  const password = await salt(input.password)
  const user = await User.create({
    data: {
      ...input,
      password,
      roles: {
        create: DEFAULT_POLICIES
      }
    }
  })
  if (user) return sign(user)
}
