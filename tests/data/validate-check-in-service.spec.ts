import { ValidateCheckInService } from '@/data/services'
import { ResourceNotFoundError, TimeExceededError } from '@/data/errors'
import { PrismaCheckInRepositoryMock } from '../mocks/data/prisma-check-in-repository.mock'

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('ValidateCheckIn Service', () => {
    let sut: ValidateCheckInService
    let checkInRepositoryStub: PrismaCheckInRepositoryMock
    const data = {
        user_id: 'user_id1',
        gym_id: 'gym_id1'
    }

    beforeEach(async () => {
        vi.useFakeTimers()
        checkInRepositoryStub = new PrismaCheckInRepositoryMock()
        sut = new ValidateCheckInService(checkInRepositoryStub)
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able validate a check in', async () => {
        const checkIn = await checkInRepositoryStub.create(data)

        const resolve = await sut.execute({ checkInId: checkIn.id })

        expect(resolve.validated_at).toEqual(expect.any(Date))
        expect(checkInRepositoryStub.checkIns[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able validate an invalid/nonexistent check in', async () => {
        const promise = sut.execute({ checkInId: 'invalid_check_in' })

        await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able validate a check in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 6, 13, 8, 0, 0))
        const checkIn = await checkInRepositoryStub.create(data)

        const twentOneMinutesInMs = 1000 * 60 * 21
        vi.advanceTimersByTime(twentOneMinutesInMs)
        const promise = sut.execute({ checkInId: checkIn.id })

        await expect(promise).rejects.toBeInstanceOf(TimeExceededError)
    })
})
