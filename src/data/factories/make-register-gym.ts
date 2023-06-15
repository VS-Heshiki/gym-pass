import { RegisterGymService } from '@/data/services'
import { PrismaGymsRepository } from '@/infra/prisma/prisma-gyms-repository'

export const makeRegisterGymService = () => {
    const gymsRepository = new PrismaGymsRepository()
    return new RegisterGymService(gymsRepository)
}
