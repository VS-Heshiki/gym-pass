export interface CreateUser {
    execute (params: CreateUser.Input): Promise<void>
}

export namespace CreateUser {
    export type Input = {
        name: string
        email: string
        phone: string
        password: string
    }
}
