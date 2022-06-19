export class EmailInUseError extends Error {
    constructor() {
        super('This email is already used')

        this.name = 'EmailInUseError'
    }
}
