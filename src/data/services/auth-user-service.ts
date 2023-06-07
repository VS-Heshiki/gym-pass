import { InvalidCredentialsError } from '@/data/errors'
import { AuthUser } from '@/domain/contracts'
import { UserRepository } from '@/infra/repositories'
import { User } from '@prisma/client'

import { compare } from 'bcryptjs'


export class AuthUserService implements AuthUser {
    constructor (private readonly userRepository: UserRepository) { }

    async execute ({ email, password }: AuthUser.Input): Promise<User> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const isValid = await compare(password, user.password_hash)

        if (!isValid) {
            throw new InvalidCredentialsError()
        }
        return user
    }

}
