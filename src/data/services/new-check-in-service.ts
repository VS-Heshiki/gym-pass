import { ResourceNotFoundError, TwiceCheckInOnSameDate } from '@/data/errors'
import { NewCheckIn } from '@/domain/contracts'
import { CheckInRepository, GymRepository } from '@/infra/repositories'
import { getDistanceBetweenCoordinates } from '@/utils'
import { CheckIn } from '@prisma/client'

export class NewCheckInService implements NewCheckIn {
    constructor (
        private readonly checkInRepository: CheckInRepository,
        private readonly gymRepository: GymRepository
    ) { }

    async execute ({ userId, gymId, userLatitude, userLongitude }: NewCheckIn.Input): Promise<CheckIn> {
        const gym = await this.gymRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = await getDistanceBetweenCoordinates(
            ({ latitude: userLatitude, longitude: userLongitude }),
            ({ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error()
        }

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
