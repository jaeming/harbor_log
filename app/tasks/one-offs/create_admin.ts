import { PrismaClient } from '@prisma/client'
import { Policy } from '../../policies/types'

const prisma = new PrismaClient()

const ADDITIONAL_POLICIES = [
  { name: Policy.postPublish },
  { name: Policy.postWrite },
  { name: Policy.userRead }
]

async function main () {
  const user = await prisma.user.update({
    where: { id: 1 },
    data: {
      admin: true,
      roles: { create: ADDITIONAL_POLICIES }
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
