import { ListUserCheckInHistoryService } from '@/data/services'
import { PrismaCheckInsRepository } from '@/infra/prisma/prisma-check-ins-repository'

export const makeListUserCheckInHistoryService = () => {
    const checkInRepository = new PrismaCheckInsRepository()
    return new ListUserCheckInHistoryService(checkInRepository)
}
