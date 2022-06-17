import { InvalidFieldError } from '@/validation/errors'
import { IFieldValidation } from '@/validation/protocols/FieldValidation'

export class EmailValidation implements IFieldValidation {
    constructor(readonly field: string) {}

    validate(value: string): Error {
        const emailRegex =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return !value || emailRegex.test(value)
            ? null
            : new InvalidFieldError('Email')
    }
}
