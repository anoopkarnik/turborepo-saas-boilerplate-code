import { PrismaClient} from '@prisma-mongo/prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}


const prisma: ReturnType<typeof prismaClientSingleton> = prismaClientSingleton()

export default prisma

