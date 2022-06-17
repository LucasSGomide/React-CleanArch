import { IFieldValidation } from '@/validation/protocols/FieldValidation'

export class FieldValidatorSpy implements IFieldValidation {
    error: Error = null

    constructor(readonly field: string) {}

    validate(value: string): Error {
        return this.error
    }
}
