import faker from 'faker'

import { CompareValuesValidation } from './CompareValuesValidation'
import { InvalidMatchError } from '@/validation/errors/InvalidMatchError'

const makeSut = (valueToCompare: string): CompareValuesValidation =>
    new CompareValuesValidation(faker.database.column(), valueToCompare)

describe('CompareValuesValidation', () => {
    test('Should return InvalidMatchError if comparison is invalid', () => {
        const sut = makeSut(faker.random.word())
        const error = sut.validate(faker.random.word())

        expect(error).toBeInstanceOf(InvalidMatchError)
    })

    test('Should return falsy if comparison is valid', () => {
        const validValue = faker.random.word()
        const sut = makeSut(validValue)
        const error = sut.validate(validValue)

        expect(error).toBeFalsy()
    })
})
