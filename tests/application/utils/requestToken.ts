import { prisma } from '@/infra/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const requestToken = async (app: FastifyInstance, isAdmin = false) => {
    await prisma.user.create({
        data: {
            name: 'any_name',
            email: 'any_email@mail.com',
            phone: '99999-9999',
            password_hash: await hash('any_password', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    })

    const auth = await request(app.server)
        .post('/sessions')
        .send({
            email: 'any_email@mail.com',
            password: 'any_password'
        })

    const token = auth.body

    return token
}
