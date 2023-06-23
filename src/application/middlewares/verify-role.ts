import { FastifyReply, FastifyRequest } from 'fastify'

export const verifyRole = (vRole: 'MEMBER' | 'ADMIN') => {
    return async (request: FastifyRequest, reply: FastifyReply) => {

        const { role } = request.user

        if (role !== vRole) {
            return reply.status(401).send({ message: 'Unauthorized' })
        }
    }
}
