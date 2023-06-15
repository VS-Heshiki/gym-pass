import { GetUserMetricsService } from '@/data/services'
import { PrismaCheckInsRepository } from '@/infra/prisma/prisma-check-ins-repository'

export const makeGetMetricsService = () => {
    const checkInRepository = new PrismaCheckInsRepository()
    return new GetUserMetricsService(checkInRepository)
}
