import { Gym } from '@prisma/client'

export interface ListNearbyGym {
    execute (params: ListNearbyGym.Input): Promise<Gym[]>
}

export namespace ListNearbyGym {
    export type Input = {
        latitude: number
        longitude: number
    }
}
