import { CheckInRepository } from '@/infra/repositories'
import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

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

        this.checkIns.push(checkIn)

        return checkIn
    }
}
