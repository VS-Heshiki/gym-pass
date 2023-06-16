import { makeGetUserByIdService } from '@/data/factories'
import { FastifyReply, FastifyRequest } from 'fastify'

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
    const getUser = makeGetUserByIdService()

    const user = await getUser.execute({
        userId: request.user.sub
    })

    return reply.status(200).send({
        ...user,
        password_hash: undefined
    })
}
