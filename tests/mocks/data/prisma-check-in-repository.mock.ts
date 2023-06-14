import { CheckInRepository } from '@/infra/repositories'
import { CheckIn, Prisma } from '@prisma/client'

import { randomUUID } from 'node:crypto'
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

    async validate (checkIn: CheckIn): Promise<CheckIn | null> {
        const validCheckIn = this.checkIns.findIndex(check => check.id === checkIn.id)

        checkIn.validated_at = new Date()

        if (validCheckIn >= 0) {
            this.checkIns[validCheckIn] = checkIn
        }

        const timeRemaining = dayjs(checkIn.validated_at).diff(checkIn.created_at)

        if (timeRemaining >= 1000 * 60 * 20) {
            return null
        }

        return checkIn
    }

    async findById (checkInId: string): Promise<CheckIn | null> {
        const checkIn = this.checkIns.find(checkIn => checkIn.id === checkInId)

        if (!checkIn) {
            return null
        }
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
