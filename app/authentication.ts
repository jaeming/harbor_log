import { user } from './config/prisma_client'

const decode = (authToken) => {
  // TODO
  return 1
}

const fetchUser = (id) => {
  return user.findOne({ where: { id }, include: { roles: true } })
}

export const currentUser = (req) => {
  const { headers: { auth } } = req
  return fetchUser(decode(auth))
}
