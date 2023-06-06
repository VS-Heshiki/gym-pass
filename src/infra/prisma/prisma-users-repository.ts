import { prisma } from '@/infra/prisma'
import { UserRepository } from '@/infra/repositories'
import { Prisma, User } from '@prisma/client'

export class PrismaUsersRepository implements UserRepository {
    async create (data: Prisma.UserCreateInput): Promise<void> {
        await prisma.user.create({
            data
        })
    }

    async findByEmail (email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }
}
