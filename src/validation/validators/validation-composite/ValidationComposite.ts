import { IValidation } from '@/presentation/protocols/Validation'
import { IFieldValidation } from '@/validation/protocols/FieldValidation'

export class ValidationComposite implements IValidation {
    constructor(private readonly validators: IFieldValidation[]) {}

    validate(fieldName: string, fieldValue: string): string {
        const filteredValidators = this.validators.filter(
            (validator) => validator.field === fieldName
        )

        for (const validator of filteredValidators) {
            const error = validator.validate(fieldValue)
            if (error) return error.message
        }
    }
}
