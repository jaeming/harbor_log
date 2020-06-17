import { user } from './config/prisma_client'
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'

export const sign = ({ id }) => {
  return jwt.sign({ id }, process.env.HARBOR, (err, token) => {
    if (err) throw new Error(err)
    return token
  })
}

const decode = (token) => {
  return jwt.verify(token, process.env.HARBOR, (err, decoded) => {
    if (err) throw new Error(`Unauthorized: ${err}`)
    return decoded.id
  })
}

const fetchUser = (id) => {
  return user.findOne({ where: { id }, include: { roles: true } })
}

export const currentUser = (req) => {
  const { headers: { auth } } = req
  return fetchUser(decode(auth))
}
