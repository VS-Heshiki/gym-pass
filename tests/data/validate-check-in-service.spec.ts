import { ValidateCheckInService } from '@/data/services'
import { PrismaCheckInRepositoryMock } from '../mocks/data/prisma-check-in-repository.mock'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('ValidateCheckIn Service', () => {
    let sut: ValidateCheckInService
    let checkInRepositoryStub: PrismaCheckInRepositoryMock
    const data = {
        user_id: 'user_id1',
        gym_id: 'gym_id1'
    }

    beforeEach(async () => {
        //vi.useFakeTimers()
        checkInRepositoryStub = new PrismaCheckInRepositoryMock()
        sut = new ValidateCheckInService(checkInRepositoryStub)
    })

    afterEach(() => {
        //vi.useRealTimers()
    })

    it('should be able validate a check in', async () => {
        const checkIn = await checkInRepositoryStub.create(data)

        const resolve = await sut.execute({ checkInId: checkIn.id })

        expect(resolve.validated_at).toEqual(expect.any(Date))
        expect(checkInRepositoryStub.checkIns[0].validated_at).toEqual(expect.any(Date))
    })
})
