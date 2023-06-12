import { NewCheckInService } from '@/data/services'
import { PrismaCheckInRepositoryMock } from '../mocks/data/prisma-check-in-repository.mock'

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { randomUUID } from 'node:crypto'
import { TwiceCheckInOnSameDate } from '@/data/errors'

describe('NewCheckIn Service', () => {
    let sut: NewCheckInService
    let checkInRepositoryStub: PrismaCheckInRepositoryMock
    const ids = ({
        userId: 'user_id1',
        gymId: 'gym_id1'
    })

    beforeEach(async () => {
        vi.useFakeTimers()
        checkInRepositoryStub = new PrismaCheckInRepositoryMock()
        sut = new NewCheckInService(checkInRepositoryStub)
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to create a check in', async () => {
        const resolve = await sut.execute({ userId: randomUUID(), gymId: randomUUID() })

        expect(resolve.id).toEqual(expect.any(String))
    })

    it('should not be able make two check ins on same date', async () => {
        vi.setSystemTime(new Date(2023, 6, 12, 8, 0, 0))

        await sut.execute(ids)
        const promise = sut.execute(ids)

        await expect(promise).rejects.toBeInstanceOf(TwiceCheckInOnSameDate)
    })
})
