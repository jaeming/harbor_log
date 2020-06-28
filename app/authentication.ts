import { user } from './config/prisma_client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import * as util from 'util'

export const sign = ({ id }) => {
  return jwt.sign({ id }, process.env.HARBOR)
}

const decode = async (token: string) => {
  const verifyToken = util.promisify(jwt.verify)
  const decoded = await verifyToken(token, process.env.HARBOR)
  return decoded.id
}

export const salt = (password: string) => {
  const hashPassword = util.promisify(bcrypt.hash)
  return hashPassword(password, 8)
}

export const compare = (password: string, hash: string) => {
  const comparePassword = util.promisify(bcrypt.compare)
  return comparePassword(password, hash)
}

const fetchUser = (id) => {
  return user.findOne({ where: { id }, include: { roles: true } })
}

export const currentUser = async (req) => {
  const { headers: { auth } } = req
  if (!auth) return

  const token = await decode(auth)
  return fetchUser(token)
}
