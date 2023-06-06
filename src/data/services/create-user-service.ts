import { UserAlreadyExistsError } from '@/data/errors'
import { CreateUser } from '@/domain/contracts'
import { UserRepository } from '@/infra/repositories/user-repository'
import { User } from '@prisma/client'

import { hash } from 'bcryptjs'

export class CreateUserService implements CreateUser {
    constructor (private readonly userRepository: UserRepository) { }

    async execute ({ name, email, phone, password }: CreateUser.Input): Promise<User> {
        const password_hash = await hash(password, 6)

        const userEmail = await this.userRepository.findByEmail(email)

        if (userEmail !== null) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.userRepository.create({ name, email, phone, password_hash })

        return user
    }
}
