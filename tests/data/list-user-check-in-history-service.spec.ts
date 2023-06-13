import { ListUserCheckInHistoryService } from '@/data/services'
import { PrismaCheckInRepositoryMock } from '../mocks/data/prisma-check-in-repository.mock'

import { describe, it, expect, beforeEach } from 'vitest'

describe('ListUserCheckInHistory Service', () => {
    let sut: ListUserCheckInHistoryService
    let checkInRepositoryStub: PrismaCheckInRepositoryMock

    beforeEach(async () => {
        checkInRepositoryStub = new PrismaCheckInRepositoryMock()
        sut = new ListUserCheckInHistoryService(checkInRepositoryStub)
    })

    it('should be able list check ins made by user', async () => {
        await checkInRepositoryStub.create({
            user_id: 'user_01',
            gym_id: 'gym_01'
        })

        await checkInRepositoryStub.create({
            user_id: 'user_01',
            gym_id: 'gym_02'
        })

        const resolve = await sut.execute({ userId: 'user_01', page: 1 })

        console.log(resolve)

        expect(resolve).toHaveLength(2)
        expect(resolve).toEqual([
            expect.objectContaining({ gym_id: 'gym_01' }),
            expect.objectContaining({ gym_id: 'gym_02' })
        ])
    })
})
