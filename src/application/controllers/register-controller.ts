import { prisma } from '@/data'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerUserSchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        phone: z.string(),
        password: z.string().min(6)
    })

    const { name, email, phone, password } = registerUserSchema.parse(request.body)

    await prisma.user.create({
        data: {
            name,
            email,
            phone,
            password_hash: password
        }
    })

    return reply.status(201).send()
}
