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

    it('should be able to return [] if it does not find any gyms', async () => {
        const gym = await sut.execute({ name: 'nodejs_gym', page: 1 })

        expect(gym).toHaveLength(0)
    })

    it('should be able list all gyms paginated per 20', async () => {
        for (let i = 1;i <= 22;i++) {
            await gymsRepositoryStub.create({
                name: `Node JS GYM ${i}`,
                latitude: -23.5146054,
                longitude: -46.1930931,
            })
        }

        const pageOne = await sut.execute({ name: 'Node JS GYM', page: 1 })
        const pageTwo = await sut.execute({ name: 'Node JS GYM', page: 2 })

        console.log(pageOne)

        expect(pageOne).toHaveLength(20)
        expect(pageTwo).toEqual([
            expect.objectContaining({ name: 'Node JS GYM 21' }),
            expect.objectContaining({ name: 'Node JS GYM 22' })
        ])
    })
})
