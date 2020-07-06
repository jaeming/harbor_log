import { user as User, Permission } from '../../config/prisma_client'
import { sign, salt } from '../../authentication'

export const register = async (_, { input }) => {
  const password = await salt(input.password)
  const user = await User.create({
    data: {
      ...input,
      password,
      roles: {
        set: [Permission.commentRead, Permission.commentWrite]
      }
    }
  })
  if (user) {
    delete user.password
    return sign(user)
  }
}
