import { ListUserCheckInHistory } from '@/domain/contracts'
import { CheckInRepository } from '@/infra/repositories'
import { CheckIn } from '@prisma/client'

export class ListUserCheckInHistoryService implements ListUserCheckInHistory {
    constructor (
        private readonly checkInRepository: CheckInRepository
    ) { }

    async execute ({ userId, page }: ListUserCheckInHistory.Input): Promise<CheckIn[]> {
        return await this.checkInRepository.listManyByUserId(userId, page)
    }
}
