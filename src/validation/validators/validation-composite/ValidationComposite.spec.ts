import faker from 'faker'

import { FieldValidatorSpy } from '../test/MockFIeldValidation'
import { ValidationComposite } from './ValidationComposite'

type SutTypes = {
    sut: ValidationComposite
    validators: FieldValidatorSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
    const validators = [
        new FieldValidatorSpy(fieldName),
        new FieldValidatorSpy(fieldName),
    ]

    const sut = new ValidationComposite(validators)

    return {
        sut,
        validators,
    }
}

describe('ValidationComposite', () => {
    test('Sould return error if any validation fails', () => {
        const fieldName = faker.database.column()
        const firstError = faker.random.words()

        const { sut, validators } = makeSut(fieldName)

        validators[0].error = new Error(firstError)

        const error = sut.validate(fieldName, faker.random.word())

        expect(error).toBe(firstError)
    })

    test('Sould return the first error found', () => {
        const fieldName = faker.database.column()
        const firstError = faker.random.words()
        const { sut, validators } = makeSut(fieldName)

        validators[0].error = new Error(firstError)
        validators[1].error = new Error(faker.random.words())

        const error = sut.validate(fieldName, faker.random.word())

        expect(error).toBe(firstError)
    })

    test('Sould return falsy if no error is found', () => {
        const fieldName = faker.database.column()
        const { sut } = makeSut(fieldName)

        const error = sut.validate(fieldName, faker.random.word())

        expect(error).toBeFalsy()
    })
})
