import { FieldValidatorSpy } from '../test/MockFIeldValidation'
import { ValidationComposite } from './ValidationComposite'

type SutTypes = {
    sut: ValidationComposite
    validators: FieldValidatorSpy[]
}

const makeSut = (): SutTypes => {
    const validators = [
        new FieldValidatorSpy('any_field'),
        new FieldValidatorSpy('any_field'),
    ]

    const sut = new ValidationComposite(validators)

    return {
        sut,
        validators,
    }
}

describe('ValidationComposite', () => {
    test('Sould return error if any validation fails', () => {
        const { sut, validators } = makeSut()

        validators[0].error = new Error('any_error')

        const error = sut.validate('any_field', 'any_value')

        expect(error).toBe('any_error')
    })

    test('Sould return the first error found', () => {
        const { sut, validators } = makeSut()

        validators[0].error = new Error('first_error')
        validators[1].error = new Error('second_error')

        const error = sut.validate('any_field', 'any_value')

        expect(error).toBe('first_error')
    })
})
