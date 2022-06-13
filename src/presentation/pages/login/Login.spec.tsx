import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import '@testing-library/jest-dom/extend-expect'

import Login from './Login'
import { ValidationSpy } from '@/presentation/test'

type SutTypes = {
    validationSpy: ValidationSpy
    user: UserEvent
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

        const emailInput = screen.getByRole('textbox')

        await user.type(emailInput, 'any_email')

        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe('any_email')
    })

    test('Should call validation with correct password', async () => {
        const { user, validationSpy } = makeSut()

        const passwordInput = screen.getByPlaceholderText(
            'Your password here...'
        )

        await user.type(passwordInput, 'any_password')

        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe('any_password')
    })
})
