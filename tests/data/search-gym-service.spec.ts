import { SearchGymService } from '@/data/services'
import { PrismaGymsRepositoryMock } from '../mocks/data/prisma-gyms-repository.mock'

import { describe, it, expect, beforeEach } from 'vitest'

describe('SearchGym Service', () => {
    let sut: SearchGymService
    let gymsRepositoryStub: PrismaGymsRepositoryMock

    beforeEach(async () => {
        gymsRepositoryStub = new PrismaGymsRepositoryMock()
        sut = new SearchGymService(gymsRepositoryStub)
        await gymsRepositoryStub.create({
            name: 'javascript_gym',
            latitude: -23.5146054,
            longitude: -46.1930931,
        })

        await gymsRepositoryStub.create({
            name: 'typescript_gym',
            latitude: -23.5212038,
            longitude: -46.1857578,
        })
    })

    it('should be able search gym by name', async () => {
        const gym = await sut.execute({ name: 'javascript_gym', page: 1 })

        expect(gym).toHaveLength(1)
        expect(gym).toEqual([expect.objectContaining({
            name: 'javascript_gym'
        })])
    })
})
