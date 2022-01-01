import { PrismaClient, Prisma } from '@prisma/client'
import { generateApiToken } from '../src/utils/apiToken'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  const token = generateApiToken()
  const apiToken = await prisma.apiToken.create({
    data: {
      token,
      allowedIPs: [],
    },
  })
  console.log(`Created API token: ${apiToken.token}`)

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
