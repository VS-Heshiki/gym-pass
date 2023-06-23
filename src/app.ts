import { env } from '@/application/env'
import { userRoutes, gymRoutes, checkInRoutes } from '@/application/routes'

import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import fastifyCookie from '@fastify/cookie'


export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymRoutes)
app.register(checkInRoutes)

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ error: 'Validation error!', issues: error.format() })
    }

    if (env.NODE_ENV === 'dev') {
        console.error(error)
    }

    return reply.status(500).send({ error: 'Internal server error!' })
})
