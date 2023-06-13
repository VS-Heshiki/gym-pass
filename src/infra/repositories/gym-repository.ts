import { Gym, Prisma } from '@prisma/client'

export interface GymRepository {
    findById (gymId: string): Promise<Gym | null>
    create (data: Prisma.GymCreateInput): Promise<Gym>
    searchByName (name: string, page: number): Promise<Gym[]>
    findManyNearby (input: FindManyNearby.Input): Promise<Gym[]>
}

export namespace FindManyNearby {
    export type Input = {
        latitude: number
        longitude: number
    }
}
