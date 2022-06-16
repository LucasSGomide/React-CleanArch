import { InvalidFieldError } from '@/validation/errors'
import { IFieldValidation } from '@/validation/protocols/FieldValidation'

export class EmailValidation implements IFieldValidation {
    constructor(readonly field: string) {}

    validate(value: string): Error {
        return new InvalidFieldError('Email')
    }
}
