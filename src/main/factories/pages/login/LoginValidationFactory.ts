import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/validation-builder/ValidationBuilder'

export const makeLoginValidation = (): ValidationComposite => {
    const validationComposite = ValidationComposite.build([
        ...ValidationBuilder.field('password').minLength(5).required().build(),
        ...ValidationBuilder.field('email').required().email().build(),
    ])

    return validationComposite
}
