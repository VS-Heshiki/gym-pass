import { ListNearbyGymService } from '@/data/services'
import { PrismaGymsRepositoryMock } from '../mocks/data/prisma-gyms-repository.mock'

import { describe, it, expect, beforeEach } from 'vitest'

describe('ListNearbyGym Service', () => {
    let sut: ListNearbyGymService
    let gymsRepositoryStub: PrismaGymsRepositoryMock

    beforeEach(async () => {
        gymsRepositoryStub = new PrismaGymsRepositoryMock()
        sut = new ListNearbyGymService(gymsRepositoryStub)
        await gymsRepositoryStub.create({
            name: 'near_gym',
            latitude: -23.5146054,
            longitude: -46.1930931,
        })

        await gymsRepositoryStub.create({
            name: 'far_gym',
            latitude: -23.5344335,
            longitude: -46.3195474,
        })
    })

    it('should be able list all gyms near to user', async () => {
        const gym = await sut.execute({ latitude: -23.5146054, longitude: -46.1930931 })

        expect(gym).toHaveLength(1)
        expect(gym).toEqual([expect.objectContaining({
            name: 'near_gym'
        })])
    })
})
