import { makeNewCheckInService } from '@/data/factories'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const newCheckIn = async (request: FastifyRequest, reply: FastifyReply) => {
    const newCheckInSchemaBody = z.object({
        userLatitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const newCheckInSchemaParams = z.object({
        gymId: z.string().uuid(),
    })

    const { userLatitude, userLongitude } = newCheckInSchemaBody.parse(request.body)

    const { gymId } = newCheckInSchemaParams.parse(request.params)

    const newCheckIn = makeNewCheckInService()

    const checkIn = await newCheckIn.execute({
        userId: request.user.sub,
        gymId,
        userLatitude,
        userLongitude
    })

    return reply.status(201).send({ checkIn })
}
