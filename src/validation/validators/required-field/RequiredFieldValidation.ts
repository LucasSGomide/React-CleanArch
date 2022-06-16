import { RequiredFieldError } from '@/validation/errors'
import { IFieldValidation } from '@/validation/protocols/FieldValidation'

export class RequiredFieldValidation implements IFieldValidation {
    constructor(readonly field: string) {}

    validate(value: string): Error {
        return value ? null : new RequiredFieldError()
    }
}
