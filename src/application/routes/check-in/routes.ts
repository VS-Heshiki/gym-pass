import { getUserMetrics, listUserCheckInHistory, newCheckIn, validateCheckIn } from '@/application/controllers/check-in'
import { verifyJWT, verifyRole } from '@/application/middlewares'
import { FastifyInstance } from 'fastify'

export async function checkInRoutes (app: FastifyInstance): Promise<void> {
    app.addHook('onRequest', verifyJWT)

    app.post('/gyms/:gymId/create-check-in', newCheckIn)
    app.get('/check-ins/history', listUserCheckInHistory)
    app.get('/check-ins/metrics', getUserMetrics)
    app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyRole('ADMIN')] }, validateCheckIn)
}
