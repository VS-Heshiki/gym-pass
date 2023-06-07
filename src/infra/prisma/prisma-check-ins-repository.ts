import { prisma } from '@/infra/prisma'
import { CheckInRepository } from '@/infra/repositories'
import { CheckIn, Prisma } from '@prisma/client'

export class PrismaCheckInsRepository implements CheckInRepository {
    async create ({ user_id, gym_id }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.create({
            data: {
                user_id,
                gym_id
            }
        })

        return checkIn
    }

}
