import { makeRegisterGymService } from '@/data/factories'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const registerGym = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerGymSchema = z.object({
        name: z.string().min(3),
        phone: z.string().nullable(),
        description: z.string().nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const data = registerGymSchema.parse(request.body)

    const register = makeRegisterGymService()

    await register.execute(data)

    return reply.status(201).send()
}
