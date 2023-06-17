import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environmentMatchGlobs: [
            ['tests/application/**.test.ts', 'prisma']
        ],
        include: [
            'tests/**/*.test.ts'
        ]
    }
})
