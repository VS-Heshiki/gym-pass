import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { requestToken } from '../utils/requestToken'

describe('GET Profile Route', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get a user profile', async () => {
        const { token } = await requestToken(app)

        const response = await request(app.server)
            .get('/me')
            .set({
                Authorization: `Bearer ${token}`
            })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(expect.objectContaining({
            name: 'any_name',
            email: 'any_email@mail.com',
            phone: '99999-9999'
        }))
    })
})
