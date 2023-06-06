import { UserAlreadyExistsError } from '@/data/errors'
import { CreateUserService } from '@/data/services/create-user-service'
import { PrismaUsersRepository } from '@/infra/prisma/prisma-users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const createUserSchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        phone: z.string(),
        password: z.string().min(6)
    })

    const data = createUserSchema.parse(request.body)

    try {
        const userRepository = new PrismaUsersRepository()
        const create = new CreateUserService(userRepository)

        await create.execute(data)
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ error: err.message })
        }
    }

    return reply.status(201).send()
}
