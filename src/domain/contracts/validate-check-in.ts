import { CheckIn } from '@prisma/client'

export interface ValidateCheckIn {
    execute (params: ValidateCheckIn.Input): Promise<CheckIn>
}

export namespace ValidateCheckIn {
    export type Input = {
        checkInId: string
    }
}
