import { FieldValidatorSpy } from '../test/MockFIeldValidation'
import { ValidationComposite } from './ValidationComposite'

describe('ValidationComposite', () => {
    test('Sould return error if any validation fails', () => {
        const fieldValdiatorSpy = new FieldValidatorSpy('any_field')
        const fieldValdiatorSpyError = new FieldValidatorSpy('any_field')

        fieldValdiatorSpyError.error = new Error('any_error')

        const sut = new ValidationComposite([
            fieldValdiatorSpy,
            fieldValdiatorSpyError,
        ])

        const error = sut.validate('any_field', 'any_value')

        expect(error).toBe('any_error')
    })
})
