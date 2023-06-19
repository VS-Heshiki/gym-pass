import { listNearbyGym, registerGym, searchGym } from '@/application/controllers/gym'
import { verifyJWT } from '@/application/middlewares'
import { FastifyInstance } from 'fastify'

export async function gymRoutes (app: FastifyInstance): Promise<void> {
    app.addHook('onRequest', verifyJWT)

    app.post('/gym/register', registerGym)
    app.get('/gym/search', searchGym)
    app.get('/gym/near-you', listNearbyGym)
}
