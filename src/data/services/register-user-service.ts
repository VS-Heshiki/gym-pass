import { UserAlreadyExistsError } from '@/data/errors'
import { RegisterUser } from '@/domain/contracts'
import { UserRepository } from '@/infra/repositories/user-repository'
import { User } from '@prisma/client'

import { hash } from 'bcryptjs'

export class RegisterUserService implements RegisterUser {
    constructor (private readonly userRepository: UserRepository) { }

    async execute ({ name, email, phone, password }: RegisterUser.Input): Promise<User> {
        const password_hash = await hash(password, 6)

        const userEmail = await this.userRepository.findByEmail(email)

        if (userEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.userRepository.register({ name, email, phone, password_hash })

        return user
    }
}
