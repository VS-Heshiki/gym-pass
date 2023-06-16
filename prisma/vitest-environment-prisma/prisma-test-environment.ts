import { Environment } from 'vitest'

export default <Environment> {
    name: 'prisma',
    async setup () {
        console.log('Start')

        return {
            async teardown () {
                console.log('End')
            }
        }
    }
}
