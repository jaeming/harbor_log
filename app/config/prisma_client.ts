import { PrismaClient } from '@prisma/client'

// interface Context {
//   // nothing yet
// }

const prisma = new PrismaClient()
export const { user, post, roles } = prisma
