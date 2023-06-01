import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
    PORT: z.number().default(8888)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('⚠️ ENVIRONMENT VARIABLES ERROR! ⚠️', _env.error.format())

    throw new Error('⚠️ ENVIRONMENT VARIABLES ERROR! ⚠️')
}

export const env = _env.data
