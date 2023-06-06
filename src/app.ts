import { env } from '@/application/env'
import { appRoutes } from '@/application/routes/routes'

import fastify from 'fastify'
import { ZodError } from 'zod'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ error: 'Validation error!', issues: error.format() })
    }

    if (env.NODE_ENV === 'dev') {
        console.error(error)
    }

    return reply.status(500).send({ error: 'Internal server error!' })
})
