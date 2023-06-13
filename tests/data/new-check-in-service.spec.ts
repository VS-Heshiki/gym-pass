import { NewCheckInService } from '@/data/services'
import { MaxDistanceError, TwiceCheckInOnSameDate } from '@/data/errors'
import { PrismaGymsRepositoryMock } from '../mocks/data/prisma-gyms-repository.mock'
import { PrismaCheckInRepositoryMock } from '../mocks/data/prisma-check-in-repository.mock'

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'

describe('NewCheckIn Service', () => {
    let sut: NewCheckInService
    let checkInRepositoryStub: PrismaCheckInRepositoryMock
    let gymsRepositoryStub: PrismaGymsRepositoryMock
    const data = ({
        userId: 'user_id1',
        gymId: 'gym_id1',
        userLatitude: -23.5211573,
        userLongitude: -46.1863876
    })

    beforeEach(async () => {
        vi.useFakeTimers()
        checkInRepositoryStub = new PrismaCheckInRepositoryMock()
        gymsRepositoryStub = new PrismaGymsRepositoryMock()
        sut = new NewCheckInService(checkInRepositoryStub, gymsRepositoryStub)
        await gymsRepositoryStub.create({
            id: 'gym_id1',
            name: 'Any Gym',
            description: null,
            phone: null,
            latitude: new Decimal(-23.5211966),
            longitude: new Decimal(-46.1869777)
        })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to create a check in', async () => {
        const resolve = await sut.execute(data)

        expect(resolve.id).toEqual(expect.any(String))
    })

    it('should not be able make two check ins on same date', async () => {
        vi.setSystemTime(new Date(2023, 6, 12, 8, 0, 0))

        await sut.execute(data)
        const promise = sut.execute(data)

        await expect(promise).rejects.toBeInstanceOf(TwiceCheckInOnSameDate)
    })

    it('should be able make two check ins on different dates', async () => {
        vi.setSystemTime(new Date(2023, 6, 12, 8, 0, 0))
        const checkInOne = await sut.execute(data)

        vi.setSystemTime(new Date(2023, 6, 13, 8, 0, 0))
        const checkInTwo = await sut.execute(data)

        expect(checkInOne.id).toEqual(expect.any(String))
        expect(checkInTwo.id).toEqual(expect.any(String))
    })

    it('should not be able create a new check in if user is not near the gym', async () => {
        const checkInOne = await sut.execute(data)

        await gymsRepositoryStub.create({
            id: 'gym_id2',
            name: 'Another Gym',
            description: null,
            phone: null,
            latitude: new Decimal(-23.5146054),
            longitude: new Decimal(-46.1930931)
        })

        const checkInTwo = sut.execute({
            userId: 'user_id2',
            gymId: 'gym_id2',
            userLatitude: -23.5211573,
            userLongitude: -46.1863876
        })

        expect(checkInOne.id).toEqual(expect.any(String))
        await expect(checkInTwo).rejects.toBeInstanceOf(MaxDistanceError)
    })
})
