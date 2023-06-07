import { NewCheckInService } from '@/data/services'
import { PrismaCheckInRepositoryMock } from '../mocks/data/prisma-check-in-repository.mock'

import { describe, it, expect, beforeEach } from 'vitest'
import { randomUUID } from 'node:crypto'

describe('NewCheckIn Service', () => {
    let sut: NewCheckInService
    let checkInRepositoryStub: PrismaCheckInRepositoryMock

    beforeEach(async () => {
        checkInRepositoryStub = new PrismaCheckInRepositoryMock()
        sut = new NewCheckInService(checkInRepositoryStub)
    })

    it('should be able to create a check in', async () => {
        const resolve = await sut.execute({ userId: randomUUID(), gymId: randomUUID() })

        expect(resolve.id).toEqual(expect.any(String))
    })
})
