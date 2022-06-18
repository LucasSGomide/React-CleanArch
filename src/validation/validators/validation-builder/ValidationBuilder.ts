import { IFieldValidation } from '@/validation/protocols/FieldValidation'
import {
    RequiredFieldValidation,
    EmailValidation,
} from '@/validation/validators'

export class ValidationBuilder {
    private constructor(
        // fieldName string receives a value when the static method field is accessed
        private readonly fieldName: string,
        // validations array store a new validation method for each loop
        private readonly validations: IFieldValidation[]
    ) {}

    // entry point - instanciates a ValidationBuilder
    static field(fieldName: string): ValidationBuilder {
        return new ValidationBuilder(fieldName, [])
    }

    // method to generate a RequiredFieldValidation e return an ValidationBuilder updated instance
    required(): ValidationBuilder {
        this.validations.push(new RequiredFieldValidation(this.fieldName))

        return this
    }

    email(): ValidationBuilder {
        this.validations.push(new EmailValidation(this.fieldName))

        return this
    }

    // returns an array of all builded validations
    build(): IFieldValidation[] {
        return this.validations
    }
}
