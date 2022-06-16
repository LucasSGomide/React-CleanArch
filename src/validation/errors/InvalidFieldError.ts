export class InvalidFieldError extends Error {
    constructor(fieldLabel: string) {
        super(`${fieldLabel} field is invalid`)
        this.name = 'InvalidFieldError'
    }
}
