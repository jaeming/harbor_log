import { user as User } from './config/prisma_client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import * as util from 'util'

export const sign = (user) => {
  return jwt.sign(user, process.env.HARBOR)
}

const decode = async (token: string) => {
  const verifyToken = util.promisify(jwt.verify)
  const decoded = await verifyToken(token, process.env.HARBOR)
  return decoded
}

export const salt = (password: string) => {
  const hashPassword = util.promisify(bcrypt.hash)
  return hashPassword(password, 8)
}

export const compare = (password: string, hash: string) => {
  const comparePassword = util.promisify(bcrypt.compare)
  return comparePassword(password, hash)
}

const fetchUser = ({ id }) => {
  return User.findOne({ where: { id } })
}

export const currentUser = async (req) => {
  const { headers: { auth } } = req
  if (!auth) return

  const user = await decode(auth)
  return fetchUser(user)
}
