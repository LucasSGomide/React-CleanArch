import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/validation-builder/ValidationBuilder'

export const makeLoginValidation = (): ValidationComposite => {
    const validationComposite = ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().minLength(5).build(),
    ])

    return validationComposite
}
