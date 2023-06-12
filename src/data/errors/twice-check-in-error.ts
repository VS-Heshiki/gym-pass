export class TwiceCheckInOnSameDate extends Error {
    constructor () {
        super('You cannot check in twice on the same day!')
        this.name = 'TwiceCheckInOnSameDate'
    }
}
