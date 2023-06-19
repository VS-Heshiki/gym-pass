import { makeListNearbyGymService } from '@/data/factories'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const listNearbyGym = async (request: FastifyRequest, reply: FastifyReply) => {
    const listNearbySchema = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const data = listNearbySchema.parse(request.query)

    const listNearby = makeListNearbyGymService()

    const gyms = await listNearby.execute(data)

    return reply.status(200).send({ gyms })
}
