import faker from 'faker'

import { ValidationBuilder as sut } from './ValidationBuilder'
import {
    RequiredFieldValidation,
    EmailValidation,
    MinLengthValidation,
} from '@/validation/validators'

describe('ValidationBuilder', () => {
    test('Should return RequiredFieldValidation', () => {
        const fieldName = faker.database.column()
        const validations = sut.field(fieldName).required().build()

        expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
    })

    test('Should return EmailValidation', () => {
        const fieldName = faker.database.column()
        const validations = sut.field(fieldName).email().build()

        expect(validations).toEqual([new EmailValidation(fieldName)])
    })

    test('Should return MinLengthValidation', () => {
        const fieldName = faker.database.column()
        const minLenght = faker.random.number()
        const validations = sut.field(fieldName).minLength(minLenght).build()

        expect(validations).toEqual([
            new MinLengthValidation(fieldName, minLenght),
        ])
    })

    test('Should return an array of validations', () => {
        const fieldName = faker.database.column()
        const minLenght = faker.random.number()
        const validations = sut
            .field(fieldName)
            .required()
            .email()
            .minLength(minLenght)
            .build()

        expect(validations).toEqual([
            new RequiredFieldValidation(fieldName),
            new EmailValidation(fieldName),
            new MinLengthValidation(fieldName, minLenght),
        ])
    })
})
