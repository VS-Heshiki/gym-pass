import { User } from '@prisma/client'

export interface RegisterUser {
    execute (params: RegisterUser.Input): Promise<User>
}

export namespace RegisterUser {
    export type Input = {
        name: string
        email: string
        phone: string
        password: string
    }
}
