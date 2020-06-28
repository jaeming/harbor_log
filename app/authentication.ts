import { user } from './config/prisma_client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const sign = ({ id }) => {
  return jwt.sign({ id }, process.env.HARBOR)
}

const decode = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.HARBOR, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded.id)
    })
  })
}

export const salt = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
}

export const compare = (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(password, hash, function (err, res) {
      if (err) reject(err)
      resolve(res)
    })
  })
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
