import { ListNearbyGym } from '@/domain/contracts'
import { GymRepository } from '@/infra/repositories'
import { Gym } from '@prisma/client'

export class ListNearbyGymService implements ListNearbyGym {
    constructor (private readonly gymRepository: GymRepository) { }

    async execute ({ latitude, longitude }: ListNearbyGym.Input): Promise<Gym[]> {
        return await this.gymRepository.findManyNearby({ latitude, longitude })
    }
}
