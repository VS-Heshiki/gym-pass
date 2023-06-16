import { makeAuthUserService } from '@/data/factories/'
import { InvalidCredentialsError } from '@/data/errors'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
    const authSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const data = authSchema.parse(request.body)

    try {
        const auth = makeAuthUserService()

        const user = await auth.execute(data)

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        return reply.status(200).send({ token })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ error: err.message })
        }
    }

    return reply.status(200).send()
}
