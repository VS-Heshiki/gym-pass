import { makeSearchGymService } from '@/data/factories'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const searchGym = async (request: FastifyRequest, reply: FastifyReply) => {
    const searchGymSchema = z.object({
        query: z.string(),
        page: z.coerce.number()
    })

    const { query, page } = searchGymSchema.parse(request.body)

    const searchByName = makeSearchGymService()

    const gyms = await searchByName.execute({ name: query, page })

    return reply.status(200).send({ gyms })
}
