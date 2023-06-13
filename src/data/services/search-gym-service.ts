import { SearchGym } from '@/domain/contracts'
import { GymRepository } from '@/infra/repositories'
import { Gym } from '@prisma/client'

export class SearchGymService implements SearchGym {
    constructor (private readonly gymRepository: GymRepository) { }

    async execute ({ name, page }: SearchGym.Input): Promise<Gym[]> {
        return await this.gymRepository.searchByName(name, page)
    }
}
