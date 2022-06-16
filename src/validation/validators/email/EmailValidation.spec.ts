import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './EmailValidation'

describe('EmailValidation', () => {
    test('Should return error if email is invalid', () => {
        const sut = new EmailValidation('')

        const error = sut.validate('')

        expect(error).toBeInstanceOf(InvalidFieldError)
    })
})
