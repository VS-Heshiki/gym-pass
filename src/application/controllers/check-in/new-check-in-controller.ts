import { makeNewCheckInService } from '@/data/factories'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const newCheckIn = async (request: FastifyRequest, reply: FastifyReply) => {
    const newCheckInSchema = z.object({
        gymId: z.string().uuid(),
        userLatitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { userLatitude, userLongitude } = newCheckInSchema.parse(request.body)

    const { gymId } = newCheckInSchema.parse(request.params)

    const newCheckIn = makeNewCheckInService()

    const checkIn = await newCheckIn.execute({
        userId: request.user.sub,
        gymId,
        userLatitude,
        userLongitude
    })

    return reply.status(201).send({ checkIn })
}
