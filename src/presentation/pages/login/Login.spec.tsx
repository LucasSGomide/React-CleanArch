import React from 'react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { render, screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import '@testing-library/jest-dom/extend-expect'

import Login from './Login'
import { ValidationSpy } from '@/presentation/test'

type SutTypes = {
    validationSpy: ValidationSpy
    user: UserEvent
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationSpy = new ValidationSpy()

    validationSpy.errorMessage = params?.validationError

    const user = userEvent.setup()
    render(<Login validation={validationSpy} />)

    return {
        validationSpy,
        user,
    }
}

describe('Login', () => {
    test('Should mount component with initial state', () => {
        const validationError = faker.random.words()

        const { validationSpy } = makeSut({ validationError })

        const errorContainer = screen.getByTestId('error-container')
        const signInButton = screen.getByRole('button', {
            name: 'Sign In',
        })
        const emailStatus = screen.getByTestId('email-status')
        const passwordStatus = screen.getByTestId('password-status')

        expect(errorContainer.childElementCount).toBe(0)
        expect(signInButton).toBeDisabled()
        expect(emailStatus.title).toBe(validationSpy.errorMessage)
        expect(emailStatus.textContent).toBe('🔴')
        expect(passwordStatus.title).toBe(validationSpy.errorMessage)
        expect(passwordStatus.textContent).toBe('🔴')
    })

    test('Should call validation with correct email', async () => {
        const { user, validationSpy } = makeSut()

        const email = faker.internet.email()
        const emailInput = screen.getByRole('textbox')

        await user.type(emailInput, email)

        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe(email)
    })

    test('Should call validation with correct password', async () => {
        const { user, validationSpy } = makeSut()

        const password = faker.internet.password()
        const passwordInput = screen.getByPlaceholderText(
            'Your password here...'
        )

        await user.type(passwordInput, password)

        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe(password)
    })

    test('Should show email error if Validation fails', async () => {
        const validationError = faker.random.words()
        const { user, validationSpy } = makeSut({ validationError })

        const emailInput = screen.getByRole('textbox')

        await user.type(emailInput, faker.internet.email())

        const emailStatus = screen.getByTestId('email-status')

        expect(emailStatus.title).toBe(validationSpy.errorMessage)
        expect(emailStatus.textContent).toBe('🔴')
    })

    test('Should show password error if Validation fails', async () => {
        const validationError = faker.random.words()
        const { user, validationSpy } = makeSut({ validationError })

        const passwordInput = screen.getByPlaceholderText(
            'Your password here...'
        )

        await user.type(passwordInput, faker.internet.password())

        const passwordStatus = screen.getByTestId('password-status')

        expect(passwordStatus.title).toBe(validationSpy.errorMessage)
        expect(passwordStatus.textContent).toBe('🔴')
    })

    test('Should show valid password state if Validation succeeds', async () => {
        const { user } = makeSut()

        const passwordInput = screen.getByPlaceholderText(
            'Your password here...'
        )

        await user.type(passwordInput, faker.internet.password())

        const passwordStatus = screen.getByTestId('password-status')

        expect(passwordStatus.title).toBe('All good!')
        expect(passwordStatus.textContent).toBe('🟢')
    })

    test('Should show valid email state if Validation succeeds', async () => {
        const { user } = makeSut()

        const emailInput = screen.getByRole('textbox')

        await user.type(emailInput, faker.internet.email())

        const emailStatus = screen.getByTestId('email-status')

        expect(emailStatus.title).toBe('All good!')
        expect(emailStatus.textContent).toBe('🟢')
    })

    test('Should enable submit button if form is valid', async () => {
        const { user } = makeSut()

        const emailInput = screen.getByRole('textbox')
        const passwordInput = screen.getByPlaceholderText(
            'Your password here...'
        )

        await user.type(passwordInput, faker.internet.password())
        await user.type(emailInput, faker.internet.email())

        const signInButton = screen.getByRole('button', { name: 'Sign In' })

        expect(signInButton).toBeEnabled()
    })

    test('Should show spin on submit', async () => {
        const { user } = makeSut()

        const emailInput = screen.getByRole('textbox')
        const passwordInput = screen.getByPlaceholderText(
            'Your password here...'
        )

        await user.type(passwordInput, faker.internet.password())
        await user.type(emailInput, faker.internet.email())

        const signInButton = screen.getByRole('button', { name: 'Sign In' })

        await userEvent.click(signInButton)

        const spinner = screen.getByTestId('spinner')

        expect(spinner).toBeInTheDocument()
    })
})
