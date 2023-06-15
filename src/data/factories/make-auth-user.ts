import { AuthUserService } from '@/data/services'
import { PrismaUsersRepository } from '@/infra/prisma/prisma-users-repository'

export const makeAuthUserService = () => {
    const userRepository = new PrismaUsersRepository()
    return new AuthUserService(userRepository)
}
