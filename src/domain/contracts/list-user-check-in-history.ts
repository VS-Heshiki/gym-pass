import { CheckIn } from '@prisma/client'

export interface ListUserCheckInHistory {
    execute (params: ListUserCheckInHistory.Input): Promise<CheckIn[]>
}

export namespace ListUserCheckInHistory {
    export type Input = {
        userId: string
        page: number
    }
}
