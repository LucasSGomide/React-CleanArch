import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './EmailValidation'

const makeSut = (): EmailValidation => new EmailValidation(faker.random.word())

describe('EmailValidation', () => {
    test('Should return error if email is invalid', () => {
        const sut = makeSut()

        const error = sut.validate(faker.random.word())

        expect(error).toBeInstanceOf(InvalidFieldError)
    })

    test('Should return falsy if email is valid', () => {
        const sut = makeSut()

        const error = sut.validate(faker.internet.email())

        expect(error).toBeFalsy()
    })

    test('Should return falsy if email is empty', () => {
        const sut = makeSut()

        const error = sut.validate('')

        expect(error).toBeFalsy()
    })
})
