export class MaxDistanceError extends Error {
    constructor () {
        super('You need to be at least 100 meters from the gym!')
        this.name = 'MaxDistanceError'
    }
}
