import { makeValidateCheckInService } from '@/data/factories'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const validateCheckIn = async (request: FastifyRequest, reply: FastifyReply) => {
    const validateCheckInSchema = z.object({
        checkInId: z.string().uuid()
    })

    const { checkInId } = validateCheckInSchema.parse(request.params)

    const newCheckIn = makeValidateCheckInService()

    await newCheckIn.execute({
        checkInId
    })

    return reply.status(204).send()
}
