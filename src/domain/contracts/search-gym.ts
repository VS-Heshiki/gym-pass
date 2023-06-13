import { Gym } from '@prisma/client'

export interface SearchGym {
    execute (params: SearchGym.Input): Promise<Gym[]>
}

export namespace SearchGym {
    export type Input = {
        name: string
        page: number
    }
}
