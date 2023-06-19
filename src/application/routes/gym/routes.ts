import { registerGym, searchGym } from '@/application/controllers/gym'
import { verifyJWT } from '@/application/middlewares'
import { FastifyInstance } from 'fastify'

export async function gymRoutes (app: FastifyInstance): Promise<void> {
    app.addHook('onRequest', verifyJWT)

    app.post('/gym/register', registerGym)
    app.post('/gym/search', searchGym)
}
