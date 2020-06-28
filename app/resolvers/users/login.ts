import { user as User } from '../../config/prisma_client'
import { sign, compare } from '../../authentication'

export const login = async (_, { input: { email, password } }) => {
  const user = await User.findOne({ where: { email } })
  if (!user) throw Error('Not Authorized: login')

  const authenticated = await compare(password, user.password!)
  if (authenticated) return sign(user)
}
