import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('PATCH RefreshToken Route', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able refresh a token', async () => {
        await request(app.server)
            .post('/user/register')
            .send({
                name: 'any_name',
                email: 'any_email@mail.com',
                phone: '99999-9999',
                password: 'any_password'
            })

        const auth = await request(app.server)
            .post('/sessions')
            .send({
                email: 'any_email@mail.com',
                password: 'any_password'
            })

        const cookie = auth.get('Set-Cookie')

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookie)

        expect(response.statusCode).toBe(200)
        expect(response.body.token).toEqual(expect.any(String))
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})
