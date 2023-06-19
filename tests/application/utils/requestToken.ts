import { FastifyInstance } from 'fastify'
import request from 'supertest'

export const requestToken = async (app: FastifyInstance) => {
    await request(app.server)
        .post('/user/register')
        .send({
            name: 'any_name',
            email: 'any_email@mail.com',
            phone: '99999-9999',
            password: 'any_password'
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
