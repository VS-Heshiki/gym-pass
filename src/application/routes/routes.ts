import { auth, profile, registerUser } from '@/application/controllers'
import { verifyJWT } from '@/application/middlewares'
import { FastifyInstance } from 'fastify'

export async function appRoutes (app: FastifyInstance): Promise<void> {
    app.post('/user/register', registerUser)
    app.post('/sessions', auth)

    app.get('/me', { onRequest: verifyJWT }, profile)
}
