import { RegisterUserService } from '@/data/services'
import { PrismaUsersRepository } from '@/infra/prisma/prisma-users-repository'

export const makeRegisterUser = () => {
    const userRepository = new PrismaUsersRepository()
    return new RegisterUserService(userRepository)
}
