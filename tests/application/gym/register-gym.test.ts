import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { requestToken } from '../utils/requestToken'

describe('POST RegisterGYM Route', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able register a gym', async () => {
        const { token } = await requestToken(app)

        const response = await request(app.server)
            .post('/gyms/register')
            .set({
                Authorization: `Bearer ${token}`
            })
            .send({
                name: 'any_name',
                description: 'any_description',
                phone: '99999-9999',
                latitude: -23.5372589,
                longitude: -46.1815311
            })

        expect(response.statusCode).toBe(201)
    })
})
