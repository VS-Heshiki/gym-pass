export class TimeExceededError extends Error {
    constructor () {
        super('Time Exceeded!')
        this.name = 'TimeExceededError'
    }
}
