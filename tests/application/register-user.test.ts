import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('POST RegisterUser Route', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able register a user', async () => {
        const response = await request(app.server)
            .post('/user/register')
            .send({
                name: 'any_name',
                email: 'any_email@mail.com',
                phone: '99999-9999',
                password: 'any_password'
            })

        expect(response.statusCode).toBe(201)
    })
})
