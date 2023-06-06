import { User } from '@prisma/client'

export interface CreateUser {
    execute (params: CreateUser.Input): Promise<User>
}

export namespace CreateUser {
    export type Input = {
        name: string
        email: string
        phone: string
        password: string
    }
}
