import { CheckInRepository } from '@/infra/repositories'
import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import dayjs from 'dayjs'

export class PrismaCheckInRepositoryMock implements CheckInRepository {
    public checkIns: CheckIn[] = []

    async create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = ({
            id: randomUUID(),
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            user_id: data.user_id,
            gym_id: data.gym_id
        })

        this.onSameDate(checkIn.user_id, checkIn.created_at)

        this.checkIns.push(checkIn)

        return checkIn
    }

    async onSameDate (userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const isOnAnotherDate = this.checkIns.find(checkIn => {
            const sameDate = dayjs(checkIn.created_at)
            const isOnSameDate = sameDate.isAfter(startOfTheDay) && sameDate.isBefore(endOfTheDay)

            return checkIn.user_id === userId && isOnSameDate
        })

        if (!isOnAnotherDate) {
            return null
        }
        return isOnAnotherDate
    }

    async listManyByUserId (userId: string, page: number): Promise<CheckIn[]> {
        return this.checkIns.filter(checkIn => checkIn.user_id === userId).slice((page - 1) * 20, page * 20)
    }

    async countCheckInByUserId (userId: string): Promise<number> {
        return this.checkIns.filter(checkIn => checkIn.user_id === userId).length
    }
}
