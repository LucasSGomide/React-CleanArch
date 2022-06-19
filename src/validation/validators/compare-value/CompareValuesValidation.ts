import { InvalidMatchError } from '@/validation/errors/InvalidMatchError'
import { IFieldValidation } from '@/validation/protocols/FieldValidation'

export class CompareValuesValidation implements IFieldValidation {
    constructor(
        readonly field: string,
        private readonly valueToCompare: string
    ) {}

    validate(value: string): Error {
        return new InvalidMatchError(this.field)
    }
}
