import { appRoutes } from '@/application/routes/routes'
import fastify from 'fastify'

export const app = fastify()

app.register(appRoutes)
