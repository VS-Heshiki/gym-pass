import { registerGym } from '@/application/controllers'
import { verifyJWT } from '@/application/middlewares'
import { FastifyInstance } from 'fastify'

export async function gymRoutes (app: FastifyInstance): Promise<void> {
    app.addHook('onRequest', verifyJWT)

    app.post('/gym/register', registerGym)
}
