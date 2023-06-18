import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('POST RegisterGYM Route', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able register a gym', async () => {
        const response = await request(app.server)
            .post('/gym/register')
            .send({
                name: 'any_name',
                description: 'any_description',
                phone: '99999-9999',
                latitude: -23.5372589,
                longitude: -46.1815311
            })

        console.log(response)

        expect(response.statusCode).toBe(201)
    })
})
