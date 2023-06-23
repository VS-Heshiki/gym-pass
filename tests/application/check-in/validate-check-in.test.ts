import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { requestToken } from '../utils/requestToken'
import { prisma } from '@/infra/prisma'
import { CheckIn } from '@prisma/client'

describe('PATCH ValidateCheckin Route', () => {

    let checkIn: CheckIn

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able validate a check in', async () => {
        const { token } = await requestToken(app, true)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                name: 'Any_Gym',
                latitude: -23.5146054,
                longitude: -46.1930931,
            }
        })

        checkIn = await prisma.checkIn.create({
            data: {
                user_id: user.id,
                gym_id: gym.id
            }
        })

        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set({
                Authorization: `Bearer ${token}`
            })
            .send({
                userLatitude: -23.5372589,
                userLongitude: -46.1815311
            })

        expect(response.statusCode).toBe(204)
        expect(await prisma.checkIn.findUnique({ where: { id: checkIn.id } }).then((checkIn) => { return checkIn?.validated_at })).toEqual(expect.any(Date))
    })
})
