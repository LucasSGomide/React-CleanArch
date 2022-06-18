import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/validation-builder/ValidationBuilder'
import { makeLoginValidation } from './LoginValidationFactory'

describe('LoginValidationFactory', () => {
    test('Should make ValidationComposite with correct validations', () => {
        const validationComposite = makeLoginValidation()

        expect(validationComposite).toEqual(
            ValidationComposite.build([
                ...ValidationBuilder.field('email').required().email().build(),
                ...ValidationBuilder.field('password')
                    .required()
                    .minLength(5)
                    .build(),
            ])
        )
    })
})
