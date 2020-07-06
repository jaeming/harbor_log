import { PrismaClient, Permission } from '@prisma/client'

const { user, post } = new PrismaClient()
export { Permission, user, post }
