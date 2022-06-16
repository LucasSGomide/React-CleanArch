import faker from 'faker'

import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './RequiredFieldValidation'

describe('RequiredFieldValidation', () => {
    test('Should return error if field is empty', () => {
        const sut = new RequiredFieldValidation('email')

        const error = sut.validate('')

        expect(error).toBeInstanceOf(RequiredFieldError)
    })

    test('Should return falsy if field is not empty', () => {
        const sut = new RequiredFieldValidation('email')

        const error = sut.validate(faker.random.word())

        expect(error).toBeFalsy()
    })
})
