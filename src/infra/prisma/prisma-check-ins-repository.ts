import { prisma } from '@/infra/prisma'
import { CheckInRepository } from '@/infra/repositories'

import { Prisma, CheckIn } from '@prisma/client'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInRepository {
    async create (params: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        return await prisma.checkIn.create({
            data: params
        })
    }

    async validate (checkIn: CheckIn): Promise<CheckIn | null> {
        checkIn.validated_at = new Date()

        const timeRemaining = dayjs(checkIn.validated_at).diff(checkIn.created_at)

        if (timeRemaining >= 1000 * 60 * 20) {
            return null
        }

        return await prisma.checkIn.update({
            where: {
                id: checkIn.id
            },
            data: {
                validated_at: checkIn.validated_at
            }
        })

    }

    async findById (checkInId: string): Promise<CheckIn | null> {
        return await prisma.checkIn.findUnique({
            where: {
                id: checkInId
            }
        })
    }

    async onSameDate (userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        return await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })
    }

    async listManyByUserId (userId: string, page: number): Promise<CheckIn[]> {
        return await prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            take: 20,
            skip: (page - 1) * 20
        })
    }

    async countCheckInByUserId (userId: string): Promise<number> {
        return await prisma.checkIn.count({
            where: {
                id: userId
            }
        })
    }
}
