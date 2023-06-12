import { TwiceCheckInOnSameDate } from '@/data/errors'
import { NewCheckIn } from '@/domain/contracts'
import { CheckInRepository } from '@/infra/repositories'
import { CheckIn } from '@prisma/client'

export class NewCheckInService implements NewCheckIn {
    constructor (private readonly checkInRepository: CheckInRepository) { }

    async execute ({ userId, gymId }: NewCheckIn.Input): Promise<CheckIn> {
        const checkInOnSameDate = await this.checkInRepository.onSameDate(userId, new Date())

        if (checkInOnSameDate) {
            throw new TwiceCheckInOnSameDate()
        }

        return await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId
        })
    }
}
