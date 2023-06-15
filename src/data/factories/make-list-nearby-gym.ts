import { ListNearbyGymService } from '@/data/services'
import { PrismaGymsRepository } from '@/infra/prisma/prisma-gyms-repository'

export const makeListNearbyGymService = () => {
    const gymsRepository = new PrismaGymsRepository()
    return new ListNearbyGymService(gymsRepository)
}
