import { register } from '@/application/controllers'
import { FastifyInstance } from 'fastify'

export async function appRoutes (app: FastifyInstance): Promise<void> {
    app.post('/users', register)
}
