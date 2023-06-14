import { prisma } from '@/infra/prisma'
import { UserRepository } from '@/infra/repositories'

import { Prisma, User } from '@prisma/client'

export class PrismaUsersRepository implements UserRepository {
    async register (data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        })
        return user
    }

    async findByEmail (email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user || null
    }

    async findById (userId: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        return user || null
    }
}
