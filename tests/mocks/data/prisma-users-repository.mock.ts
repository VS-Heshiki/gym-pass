import { UserRepository } from '@/infra/repositories'
import { Prisma, User } from '@prisma/client'

export class PrismaUsersRepositoryMock implements UserRepository {
    public users: User[] = []

    async register (data: Prisma.UserCreateInput): Promise<User> {
        const user = ({
            id: 'Any_Id',
            name: data.email,
            email: data.email,
            phone: data.phone,
            password_hash: data.password_hash,
            created_at: new Date()
        })

        this.users.push(user)

        return user
    }

    async findByEmail (email: string): Promise<User | null> {
        const user = this.users.find(users => users.email === email)

        if (!user) {
            return null
        }
        return user
    }
}
