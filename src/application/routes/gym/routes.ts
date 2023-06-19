import { listNearbyGym, registerGym, searchGym } from '@/application/controllers/gym'
import { verifyJWT } from '@/application/middlewares'
import { FastifyInstance } from 'fastify'

export async function gymRoutes (app: FastifyInstance): Promise<void> {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms/register', registerGym)
    app.get('/gyms/search', searchGym)
    app.get('/gyms/near-you', listNearbyGym)
}
