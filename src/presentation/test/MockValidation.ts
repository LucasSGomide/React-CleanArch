import { IValidation } from '../protocols/Validation'

export class ValidationSpy implements IValidation {
    errorMessage: string
    fieldName: string
    fieldValue: string

    validate(fieldName: string, fieldValue: string): string {
        this.fieldName = fieldName
        this.fieldValue = fieldValue

        return this.errorMessage
    }
}
