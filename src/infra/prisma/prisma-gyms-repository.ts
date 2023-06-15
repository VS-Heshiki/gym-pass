import { prisma } from '@/infra/prisma'
import { FindManyNearby, GymRepository } from '@/infra/repositories'
import { getDistanceBetweenCoordinates } from '@/utils'

import { Gym, Prisma } from '@prisma/client'

export class PrismaGymsRepository implements GymRepository {
    async findById (gymId: string): Promise<Gym | null> {
        return await prisma.gym.findUnique({
            where: {
                id: gymId
            }
        })
    }

    async create (data: Prisma.GymCreateInput): Promise<Gym> {
        return await prisma.gym.create({
            data
        })
    }

    async searchByName (name: string, page: number): Promise<Gym[]> {
        return await prisma.gym.findMany({
            where: {
                name: {
                    contains: name
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })
    }

    async findManyNearby ({ latitude, longitude }: FindManyNearby.Input): Promise<Gym[]> {
        return await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
        // Haversine Formula ⬆️
    }
}
