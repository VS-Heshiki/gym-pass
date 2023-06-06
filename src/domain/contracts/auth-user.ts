import { User } from '@prisma/client'

export interface AuthUser {
    execute (params: AuthUser.Input): Promise<User>
}

export namespace AuthUser {
    export type Input = {
        email: string
        password: string
    }
}
