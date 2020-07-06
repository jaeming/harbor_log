import { PrismaClient, Permission } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  const user = await prisma.user.update({
    where: { id: 1 },
    data: {
      admin: true,
      roles: {
        set: Object.values(Permission)
      }
    }
  })
  console.dir(user)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
