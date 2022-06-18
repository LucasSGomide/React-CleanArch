import { IValidation } from '@/presentation/protocols/Validation'
import { IFieldValidation } from '@/validation/protocols/FieldValidation'

export class ValidationComposite implements IValidation {
    private constructor(private readonly validators: IFieldValidation[]) {}

    static build(validators: IFieldValidation[]): ValidationComposite {
        return new ValidationComposite(validators)
    }

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
