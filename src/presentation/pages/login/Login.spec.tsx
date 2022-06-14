import React from 'react'
import faker from 'faker'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import '@testing-library/jest-dom/extend-expect'

import Login from './Login'
import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'

type SutTypes = {
    validationSpy: ValidationSpy
    user: UserEvent
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationSpy = new ValidationSpy()
    const authenticationSpy = new AuthenticationSpy()

    validationSpy.errorMessage = params?.validationError

    const user = userEvent.setup()
    render(
        <Login validation={validationSpy} authentication={authenticationSpy} />
    )

    return {
        validationSpy,
        authenticationSpy,
        user,
    }
}

const simulateValidSubmit = async (
    user: UserEvent,
    email = faker.internet.email(),
    password = faker.internet.password()
): Promise<void> => {
    await populateEmailField(user, email)
    await populatePasswordField(user, password)

    const signInButton = screen.getByRole('button', { name: 'Sign In' })

    await userEvent.click(signInButton)
}

const populateEmailField = async (
    user: UserEvent,
    email = faker.internet.email()
): Promise<void> => {
    const emailInput = screen.getByRole('textbox')

    await user.type(emailInput, email)
}

const populatePasswordField = async (
    user: UserEvent,
    password = faker.internet.password()
): Promise<void> => {
    const passwordInput = screen.getByPlaceholderText('Your password here...')

    await user.type(passwordInput, password)
}

const simulateFieldStatus = (
    field: string,
    validationSpy: ValidationSpy,
    validationError?: string
): void => {
    const fieldStatus = screen.getByTestId(`${field}-status`)

    expect(fieldStatus.title).toBe(
        validationError ? validationSpy.errorMessage : 'All good!'
    )
    expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login', () => {
    test('Should mount component with initial state', () => {
        const validationError = faker.random.words()

        const { validationSpy } = makeSut({ validationError })

        const errorContainer = screen.getByTestId('error-container')
        const signInButton = screen.getByRole('button', {
            name: 'Sign In',
        })

        expect(errorContainer.childElementCount).toBe(0)
        expect(signInButton).toBeDisabled()

        simulateFieldStatus('email', validationSpy, validationError)
        simulateFieldStatus('password', validationSpy, validationError)
    })

    test('Should call validation with correct email', async () => {
        const { user, validationSpy } = makeSut()

        const email = faker.internet.email()
        await populateEmailField(user, email)

        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe(email)
    })

    test('Should call validation with correct password', async () => {
        const { user, validationSpy } = makeSut()

        const password = faker.internet.password()
        await populatePasswordField(user, password)

        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe(password)
    })

    test('Should show email error if Validation fails', async () => {
        const validationError = faker.random.words()
        const { user, validationSpy } = makeSut({ validationError })

        await populateEmailField(user)

        simulateFieldStatus('email', validationSpy, validationError)
    })

    test('Should show password error if Validation fails', async () => {
        const validationError = faker.random.words()
        const { user, validationSpy } = makeSut({ validationError })

        await populatePasswordField(user)

        simulateFieldStatus('password', validationSpy, validationError)
    })

    test('Should show valid password state if Validation succeeds', async () => {
        const { user, validationSpy } = makeSut()

        await populatePasswordField(user)

        simulateFieldStatus('password', validationSpy)
    })

    test('Should show valid email state if Validation succeeds', async () => {
        const { user, validationSpy } = makeSut()

        await populateEmailField(user)

        simulateFieldStatus('email', validationSpy)
    })

    test('Should enable submit button if form is valid', async () => {
        const { user } = makeSut()

        await populateEmailField(user)
        await populatePasswordField(user)

        const signInButton = screen.getByRole('button', { name: 'Sign In' })

        expect(signInButton).toBeEnabled()
    })

    test('Should show spin on submit', async () => {
        const { user } = makeSut()

        await simulateValidSubmit(user)

        const spinner = screen.getByTestId('spinner')

        expect(spinner).toBeInTheDocument()
    })

    test('Should call authentication with correct values', async () => {
        const { user, authenticationSpy } = makeSut()

        const email = faker.internet.email()
        const password = faker.internet.password()

        await simulateValidSubmit(user, email, password)

        expect(authenticationSpy.params).toEqual({ email, password })
    })

    test('Should call authentication only once', async () => {
        const { user, authenticationSpy } = makeSut()

        const email = faker.internet.email()
        const password = faker.internet.password()

        await populateEmailField(user, email)
        await populatePasswordField(user, password)

        const signInButton = screen.getByRole('button', { name: 'Sign In' })

        await userEvent.click(signInButton)
        await userEvent.click(signInButton)

        expect(authenticationSpy.callsCount).toBe(1)
    })
})
