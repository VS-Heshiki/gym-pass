import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('POST Auth Route', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able authenticate a user', async () => {
        await request(app.server)
            .post('/user/register')
            .send({
                name: 'any_name',
                email: 'any_email@mail.com',
                phone: '99999-9999',
                password: 'any_password'
            })

        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: 'any_email@mail.com',
                password: 'any_password'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.token).toEqual(expect.any(String))
    })
})
