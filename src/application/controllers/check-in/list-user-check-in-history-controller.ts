import { makeListUserCheckInHistoryService } from '@/data/factories'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const listUserCheckInHistory = async (request: FastifyRequest, reply: FastifyReply) => {
    const listUserCheckInHistorySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = listUserCheckInHistorySchema.parse(request.query)

    const listUserCheckIn = makeListUserCheckInHistoryService()

    const listCheckIn = await listUserCheckIn.execute({
        userId: request.user.sub,
        page
    })

    return reply.status(200).send({ listCheckIn })
}
