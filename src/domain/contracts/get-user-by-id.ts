import { User } from '@prisma/client'

export interface GetUserById {
    execute (params: GetUserById.Input): Promise<User>
}

export namespace GetUserById {
    export type Input = {
        userId: string
    }
}
