import { GymRepository, FindManyNearby } from '@/infra/repositories'
import { getDistanceBetweenCoordinates } from '@/utils'
import { Gym, Prisma } from '@prisma/client'

import { randomUUID } from 'crypto'

export class PrismaGymsRepositoryMock implements GymRepository {
    public gyms: Gym[] = []

    async create ({ id, name, description, phone, latitude, longitude }: Prisma.GymCreateInput): Promise<Gym> {
        const gym = ({
            id: id ?? randomUUID(),
            name,
            description: description ?? null,
            phone: phone ?? null,
            latitude: new Prisma.Decimal(latitude.toString()),
            longitude: new Prisma.Decimal(longitude.toString()),
            created_at: new Date()
        })

        this.gyms.push(gym)

        return gym
    }

    async findById (gymId: string): Promise<Gym | null> {
        const gym = this.gyms.find(gym => gym.id === gymId)

        if (!gym) {
            return null
        }
        return gym
    }

    async searchByName (name: string, page: number): Promise<Gym[]> {
        return this.gyms.filter(gym => gym.name.includes(name)).slice((page - 1) * 20, page * 20)
    }

    async findManyNearby (input: FindManyNearby.Input): Promise<Gym[]> {
        return this.gyms.filter(gym => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: input.latitude, longitude: input.longitude },
                { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
            )

            return distance <= 10
        })
    }
}
