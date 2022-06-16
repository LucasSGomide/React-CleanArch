import { InvalidFieldLengthError } from '@/validation/errors'
import { MinLengthValidation } from './MinLengthValidation'

describe('MinLengthValidation', () => {
    test('Should return error if value length is below min length', () => {
        const sut = new MinLengthValidation('Field', 5)

        const error = sut.validate('')

        console.log(error.message)

        expect(error).toBeInstanceOf(InvalidFieldLengthError)
    })
})
