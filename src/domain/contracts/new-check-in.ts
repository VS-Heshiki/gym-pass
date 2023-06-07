import { CheckIn } from '@prisma/client'

export interface NewCheckIn {
    execute (params: NewCheckIn.Input): Promise<CheckIn>
}

export namespace NewCheckIn {
    export type Input = {
        userId: string
        gymId: string
    }
}
