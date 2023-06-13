import { GetUserMetricsService } from '@/data/services'
import { PrismaCheckInRepositoryMock } from '../mocks/data/prisma-check-in-repository.mock'

import { describe, it, expect, beforeEach } from 'vitest'

describe('GetUserMetrics Service', () => {
    let sut: GetUserMetricsService
    let checkInRepositoryStub: PrismaCheckInRepositoryMock

    beforeEach(async () => {
        checkInRepositoryStub = new PrismaCheckInRepositoryMock()
        sut = new GetUserMetricsService(checkInRepositoryStub)
    })

    it('should be able to count how many check in made by user', async () => {
        for (let i = 1;i <= 20;i++) {
            await checkInRepositoryStub.create({
                user_id: 'user_01',
                gym_id: `gym_0${i}`
            })
        }

        const count = await sut.execute({ userId: 'user_01' })

        expect(count).toBe(20)
    })
})
