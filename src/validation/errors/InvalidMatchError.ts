export class InvalidMatchError extends Error {
    constructor(fieldLabel: string) {
        super(`${fieldLabel} don't match`)

        this.name = 'InvalidMatchError'
    }
}
