import { RegisterGym } from '@/domain/contracts'
import { GymRepository } from '@/infra/repositories'
import { Gym } from '@prisma/client'

export class RegisterGymService implements RegisterGym {
    constructor (private readonly gymRepository: GymRepository) { }

    async execute ({ name, description, phone, latitude, longitude }: RegisterGym.Input): Promise<Gym> {
        return await this.gymRepository.create({
            name,
            description,
            phone,
            latitude,
            longitude
        })
    }
}
