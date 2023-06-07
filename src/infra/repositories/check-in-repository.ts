import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
    create (params: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
