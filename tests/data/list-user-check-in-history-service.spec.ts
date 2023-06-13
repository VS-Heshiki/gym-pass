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

        expect(resolve).toHaveLength(2)
        expect(resolve).toEqual([
            expect.objectContaining({ gym_id: 'gym_01' }),
            expect.objectContaining({ gym_id: 'gym_02' })
        ])
    })

    it('should be able list all check in paginated per 20', async () => {
        for (let i = 1;i <= 22;i++) {
            await checkInRepositoryStub.create({
                user_id: 'user_01',
                gym_id: `gym_${i}`
            })
        }

        const resolve = await sut.execute({ userId: 'user_01', page: 2 })

        expect(resolve).toHaveLength(2)
        expect(resolve).toEqual([
            expect.objectContaining({ gym_id: 'gym_21' }),
            expect.objectContaining({ gym_id: 'gym_22' })
        ])
    })
})
