import { makeGetMetricsService } from '@/data/factories'

import { FastifyReply, FastifyRequest } from 'fastify'

export const getUserMetrics = async (request: FastifyRequest, reply: FastifyReply) => {
    const getUserMetrics = makeGetMetricsService()

    const checkIn = await getUserMetrics.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({ checkIn })
}
