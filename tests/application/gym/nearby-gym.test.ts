import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { requestToken } from '../utils/requestToken'

describe('GET ListNearbyGYM Route', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able search a gym by name', async () => {
        const { token } = await requestToken(app, true)

        await request(app.server)
            .post('/gyms/register')
            .set({
                Authorization: `Bearer ${token}`
            })
            .send({
                name: 'near_gym',
                description: 'any_description',
                phone: '99999-9999',
                latitude: -23.5302272,
                longitude: -46.1868468,
            })

        await request(app.server)
            .post('/gyms/register')
            .set({
                Authorization: `Bearer ${token}`
            })
            .send({
                name: 'far_gym',
                description: 'any_description',
                phone: '99999-9999',
                latitude: -23.5344335,
                longitude: -46.3195474,
            })

        const response = await request(app.server)
            .get('/gyms/near-you')
            .query({
                latitude: -23.5146054,
                longitude: -46.1930931,
            })
            .set({
                Authorization: `Bearer ${token}`
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms[0]).toEqual(expect.objectContaining({
            name: 'near_gym'
        }))
    })
})
