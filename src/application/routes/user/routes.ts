import { auth, profile, registerUser, refreshToken } from '@/application/controllers/user'
import { verifyJWT } from '@/application/middlewares'
import { FastifyInstance } from 'fastify'

export async function userRoutes (app: FastifyInstance): Promise<void> {
    app.post('/user/register', registerUser)
    app.post('/sessions', auth)
    app.patch('/token/refresh', refreshToken)

    app.get('/me', { onRequest: verifyJWT }, profile)
}
