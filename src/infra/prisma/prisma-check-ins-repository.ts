import { prisma } from '@/infra/prisma'
import { CheckInRepository } from '@/infra/repositories'
import { CheckIn, Prisma } from '@prisma/client'

import dayjs from 'dayjs'

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

    async onSameDate (userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: { user_id: userId }
        })

        const isDate = dayjs(checkIn?.created_at)
        const isOnAnotherDate = isDate.isAfter(startOfTheDay) && isDate.isBefore(endOfTheDay)

        if (!isOnAnotherDate) {
            return null
        }
        return checkIn
    }
}
