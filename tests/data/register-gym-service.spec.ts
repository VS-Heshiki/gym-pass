import { RegisterGymService } from '@/data/services/register-gym-service'
import { RegisterGym } from '@/domain/contracts'
import { PrismaGymsRepositoryMock } from '../mocks/data/prisma-gyms-repository.mock'

import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
describe('RegisterGym Service', () => {
    let sut: RegisterGymService
    let gymsRepositoryStub: PrismaGymsRepositoryMock
    let gymData: RegisterGym.Input

    beforeAll(() => {
        gymData = ({
            name: 'Any_Gym',
            description: null,
            phone: null,
            latitude: -23.5146054,
            longitude: -46.1930931,
        })
    })

    beforeEach(() => {
        gymsRepositoryStub = new PrismaGymsRepositoryMock()
        sut = new RegisterGymService(gymsRepositoryStub)
    })

    it('should be able register a gym on success', async () => {
        const gym = await sut.execute(gymData)

        expect(gym.id).toEqual(expect.any(String))
    })
})
