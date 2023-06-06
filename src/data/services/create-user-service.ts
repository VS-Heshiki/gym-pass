import { CreateUser } from '@/domain/contracts'
import { UserRepository } from '@/infra/repositories/user-repository'
import { hash } from 'bcryptjs'

export class CreateUserService implements CreateUser {
    constructor (private readonly userRepository: UserRepository) { }

    async execute ({ name, email, phone, password }: CreateUser.Input): Promise<void> {
        const password_hash = await hash(password, 6)

        const isValid = await this.userRepository.findByEmail(email)

        if (isValid) {
            throw new Error('Email already registered')
        }

        await this.userRepository.create({ name, email, phone, password_hash })
    }
}
