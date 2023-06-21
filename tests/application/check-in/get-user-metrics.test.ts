import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { requestToken } from '../utils/requestToken'
import { prisma } from '@/infra/prisma'

describe('GET GetUserMetrics Route', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able return total of check ins made by user', async () => {
        const { token } = await requestToken(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                name: 'Any_Gym',
                latitude: -23.5146054,
                longitude: -46.1930931,
            }
        })

        await prisma.checkIn.createMany({
            data: [{
                user_id: user.id,
                gym_id: gym.id
            }, {
                user_id: user.id,
                gym_id: gym.id
            }]
        })

        const response = await request(app.server)
            .get('/check-ins/metrics')
            .set({
                Authorization: `Bearer ${token}`
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.checkIn).toBe(2)
    })
})
