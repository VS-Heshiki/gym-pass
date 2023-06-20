import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { requestToken } from '../utils/requestToken'
import { prisma } from '@/infra/prisma'

describe('POST NewCheckIn Route', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able create a check in', async () => {
        const { token } = await requestToken(app)

        const gym = await prisma.gym.create({
            data: {
                name: 'any_name',
                description: 'any_description',
                phone: '99999-9999',
                latitude: -23.5372589,
                longitude: -46.1815311
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/create-check-in`)
            .set({
                Authorization: `Bearer ${token}`
            })
            .send({
                userLatitude: -23.5372589,
                userLongitude: -46.1815311
            })

        expect(response.statusCode).toBe(201)
    })
})
