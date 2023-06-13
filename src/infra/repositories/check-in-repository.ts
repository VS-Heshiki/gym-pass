import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
    create (params: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    validate (checkIn: CheckIn): Promise<CheckIn>
    findById (checkInId: string): Promise<CheckIn | null>
    onSameDate (userId: string, date: Date): Promise<CheckIn | null>
    listManyByUserId (userId: string, page: number): Promise<CheckIn[]>
    countCheckInByUserId (userId: string): Promise<number>
}
