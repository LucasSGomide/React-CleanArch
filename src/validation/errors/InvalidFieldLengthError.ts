export class InvalidFieldLengthError extends Error {
    constructor(fieldLabel: string, minLenght: number) {
        super(`${fieldLabel} require at least ${minLenght} characters.`)
    }
}
