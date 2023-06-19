import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { requestToken } from '../utils/requestToken'

describe('GET SearchGYM Route', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able search a gym by name', async () => {
        const { token } = await requestToken(app)

        for (let i = 0;i <= 5;i++) {
            await request(app.server)
                .post('/gyms/register')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send({
                    name: `any_name_${i}`,
                    description: 'any_description',
                    phone: '99999-9999',
                    latitude: -23.5372589,
                    longitude: -46.1815311
                })
        }

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                query: 'any_name_3',
                page: 1
            })
            .set({
                Authorization: `Bearer ${token}`
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms[0]).toEqual(expect.objectContaining({
            name: 'any_name_3'
        }))
    })
})
