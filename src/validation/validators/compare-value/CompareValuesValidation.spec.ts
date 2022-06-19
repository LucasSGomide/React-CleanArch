import faker from 'faker'

import { CompareValuesValidation } from './CompareValuesValidation'
import { InvalidMatchError } from '@/validation/errors/InvalidMatchError'

const makeSut = (valueToCompare: string): CompareValuesValidation =>
    new CompareValuesValidation(faker.database.column(), valueToCompare)

describe('CompareValuesValidation', () => {
    test('Should return InvalidMatchError if value is invalid', () => {
        const sut = makeSut(faker.random.word())

        const error = sut.validate(faker.random.word())

        expect(error).toBeInstanceOf(InvalidMatchError)
    })
})
