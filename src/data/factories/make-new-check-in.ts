import { NewCheckInService } from '@/data/services'
import { PrismaCheckInsRepository } from '@/infra/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/infra/prisma/prisma-gyms-repository'

export const makeNewCheckInService = () => {
    const checkInRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    return new NewCheckInService(checkInRepository, gymsRepository)
}
