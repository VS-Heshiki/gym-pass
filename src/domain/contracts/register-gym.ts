import { Gym } from '@prisma/client'

export interface RegisterGym {
    execute (params: RegisterGym.Input): Promise<Gym>
}

export namespace RegisterGym {
    export type Input = {
        name: string
        description: string | null
        phone: string | null
        latitude: number
        longitude: number
    }
}
