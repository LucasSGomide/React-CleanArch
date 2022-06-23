import React from 'react'
import faker from 'faker'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import '@testing-library/jest-dom/extend-expect'

import Login from './Login'
import { ValidationSpy, AuthenticationSpy, SaveAccesTokenMock } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { Router } from 'react-router-dom'

type SutTypes = {
    validationSpy: ValidationSpy
    user: UserEvent
    authenticationSpy: AuthenticationSpy
    history: MemoryHistory
    saveAccessTokenMock: SaveAccesTokenMock
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/login'] })
    const validationSpy = new ValidationSpy()
    const authenticationSpy = new AuthenticationSpy()
    const saveAccessTokenMock = new SaveAccesTokenMock()

    validationSpy.errorMessage = params?.validationError

    const user = userEvent.setup()
    render(
        <Router location={history.location} navigator={history}>
            <Login
                validation={validationSpy}
                authentication={authenticationSpy}
                saveAccessToken={saveAccessTokenMock}
            />
        </Router>
    )

    return {
        validationSpy,
        authenticationSpy,
        history,
        user,
        saveAccessTokenMock,
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

const testFieldStatus = (
    field: string,
    validationSpy: ValidationSpy,
    validationError?: string
): void => {
    const fieldStatus = screen.getByTestId(`${field}-status`)

    expect(fieldStatus.title).toBe(validationError ? validationSpy.errorMessage : 'All good!')
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

        testFieldStatus('email', validationSpy, validationError)
        testFieldStatus('password', validationSpy, validationError)
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

        testFieldStatus('email', validationSpy, validationError)
    })

    test('Should show password error if Validation fails', async () => {
        const validationError = faker.random.words()
        const { user, validationSpy } = makeSut({ validationError })

        await populatePasswordField(user)

        testFieldStatus('password', validationSpy, validationError)
    })

    test('Should show valid password state if Validation succeeds', async () => {
        const { user, validationSpy } = makeSut()

        await populatePasswordField(user)

        testFieldStatus('password', validationSpy)
    })

    test('Should show valid email state if Validation succeeds', async () => {
        const { user, validationSpy } = makeSut()

        await populateEmailField(user)

        testFieldStatus('email', validationSpy)
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

    test('Should not call authentication if form is invalid', async () => {
        const validationError = faker.random.words()
        const { user, authenticationSpy } = makeSut({ validationError })

        await simulateValidSubmit(user)

        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('Should present error if authentication fail', async () => {
        const { user, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()

        jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

        await simulateValidSubmit(user)

        const errorContainer = screen.getByTestId('error-container')
        const errorMessage = within(errorContainer).getByText(error.message)

        expect(errorContainer.childElementCount).toBe(1)
        expect(errorMessage).toBeInTheDocument()
    })

    test('Should call SaveAccessToken on success', async () => {
        const { user, history, authenticationSpy, saveAccessTokenMock } = makeSut()

        expect(history.location.pathname).toBe('/login')
        expect(history.index).toBe(0)

        await simulateValidSubmit(user)

        expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)

        expect(history.location.pathname).toBe('/')
        expect(history.index).toBe(1)
    })

    test('Should present error if SaveAccessToken fails', async () => {
        const { user, saveAccessTokenMock } = makeSut()
        const error = new InvalidCredentialsError()

        jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)

        await simulateValidSubmit(user)

        const errorContainer = screen.getByTestId('error-container')
        const errorMessage = within(errorContainer).getByText(error.message)

        expect(errorContainer.childElementCount).toBe(1)
        expect(errorMessage).toBeInTheDocument()
    })

    test('Should go to to sign up page', async () => {
        const { user, history } = makeSut()
        const signUpLink = screen.getByRole('link')

        expect(history.location.pathname).toBe('/login')
        expect(history.index).toBe(0)

        await user.click(signUpLink)

        expect(history.location.pathname).toBe('/signup')
        expect(history.index).toBe(1)
    })
})
