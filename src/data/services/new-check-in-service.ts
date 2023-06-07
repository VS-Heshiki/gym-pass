import { NewCheckIn } from '@/domain/contracts'
import { CheckInRepository } from '@/infra/repositories'
import { CheckIn } from '@prisma/client'

export class NewCheckInService implements NewCheckIn {
    constructor (private readonly checkInRepository: CheckInRepository) { }

    async execute ({ userId, gymId }: NewCheckIn.Input): Promise<CheckIn> {
        return await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId
        })
    }
}
