import '@fastify/jwt'

declare module '@fastify/jwt' {
    interface FastifyJWT {
        sub: {
            id: string
        }
    }
}
