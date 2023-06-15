import { GetUserByIdService } from '@/data/services'
import { PrismaUsersRepository } from '@/infra/prisma/prisma-users-repository'

export const makeGetUserByIdService = () => {
    const userRepository = new PrismaUsersRepository()
    return new GetUserByIdService(userRepository)
}
