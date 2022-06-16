import faker from 'faker'

import { InvalidFieldLengthError } from '@/validation/errors'
import { MinLengthValidation } from './MinLengthValidation'

const makeSut = (): MinLengthValidation =>
    new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
    test('Should return error if value length is below min length', () => {
        const sut = makeSut()

        const error = sut.validate(faker.random.alphaNumeric(4))

        expect(error).toBeInstanceOf(InvalidFieldLengthError)
    })

    test('Should return falsu if value length is valid', () => {
        const sut = makeSut()

        const error = sut.validate(faker.random.alphaNumeric(5))

        expect(error).toBeFalsy()
    })
})
