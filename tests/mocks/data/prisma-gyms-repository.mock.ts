import { GymRepository } from '@/infra/repositories'
import { Gym } from '@prisma/client'

export class PrismaGymsRepositoryMock implements GymRepository {
    public gyms: Gym[] = []

    async findById (gymId: string): Promise<Gym | null> {
        const gym = this.gyms.find(gym => gym.id === gymId)

        if (!gym) {
            return null
        }
        return gym
    }
}
