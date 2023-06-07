import { ResourceNotFoundError } from '@/data/errors'
import { GetUserById } from '@/domain/contracts'
import { UserRepository } from '@/infra/repositories'
import { User } from '@prisma/client'


export class GetUserByIdService implements GetUserById {
    constructor (private readonly userRepository: UserRepository) { }

    async execute ({ userId }: GetUserById.Input): Promise<User> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }
        return user
    }

}
