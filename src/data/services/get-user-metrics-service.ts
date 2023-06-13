import { GetUserMetrics } from '@/domain/contracts'
import { CheckInRepository } from '@/infra/repositories'


export class GetUserMetricsService implements GetUserMetrics {
    constructor (private readonly checkInRepository: CheckInRepository) { }

    async execute ({ userId }: GetUserMetrics.Input): Promise<number> {
        return await this.checkInRepository.countCheckInByUserId(userId)
    }
}
