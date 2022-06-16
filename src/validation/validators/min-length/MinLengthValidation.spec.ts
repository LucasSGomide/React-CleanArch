import { InvalidFieldLengthError } from '@/validation/errors'
import { MinLengthValidation } from './MinLengthValidation'

describe('MinLengthValidation', () => {
    test('Should return error if value length is below min length', () => {
        const sut = new MinLengthValidation('Field', 5)

        const error = sut.validate('')

        expect(error).toBeInstanceOf(InvalidFieldLengthError)
    })

    test('Should return falsu if value length is valid', () => {
        const sut = new MinLengthValidation('Field', 5)

        const error = sut.validate('VALID_WORD')

        expect(error).toBeFalsy()
    })
})
