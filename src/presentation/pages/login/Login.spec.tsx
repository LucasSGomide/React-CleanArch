import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import '@testing-library/jest-dom/extend-expect'

import Login from './Login'
import { IValidation } from '@/presentation/protocols/Validation'

type SutTypes = {
    validationSpy: ValidationSpy
    user: UserEvent
}

class ValidationSpy implements IValidation {
    errorMessage: string
    input: object

    validate(input: object): string {
        this.input = input

        return this.errorMessage
    }
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const user = userEvent.setup()
    render(<Login validation={validationSpy} />)

    return {
        validationSpy,
        user,
    }
}

describe('Login', () => {
    test('Should mount component with initial state', () => {
        makeSut()

        const errorContainer = screen.getByTestId('error-container')
        const signInButton = screen.getByRole('button', {
            name: 'Sign In',
        })
        const emailStatus = screen.getByTestId('email-status')
        const passwordStatus = screen.getByTestId('password-status')

        expect(errorContainer.childElementCount).toBe(0)
        expect(signInButton).toBeDisabled()
        expect(emailStatus.title).toBe('Required field')
        expect(emailStatus.textContent).toBe('🔴')
        expect(passwordStatus.title).toBe('Required field')
        expect(passwordStatus.textContent).toBe('🔴')
    })

    test('Should call validation with correct email', async () => {
        const { user, validationSpy } = makeSut()

        const [emailInput] = screen.getAllByRole('textbox')

        await user.type(emailInput, 'any_email')

        expect(validationSpy.input).toEqual({
            email: 'any_email',
        })
    })
})
