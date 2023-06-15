import { SearchGymService } from '@/data/services'
import { PrismaGymsRepository } from '@/infra/prisma/prisma-gyms-repository'

export const makeSearchGymService = () => {
    const gymsRepository = new PrismaGymsRepository()
    return new SearchGymService(gymsRepository)
}
