import { ValidateCheckInService } from '@/data/services'
import { PrismaCheckInsRepository } from '@/infra/prisma/prisma-check-ins-repository'

export const makeValidateCheckInService = () => {
    const checkInRepository = new PrismaCheckInsRepository()
    return new ValidateCheckInService(checkInRepository)
}
