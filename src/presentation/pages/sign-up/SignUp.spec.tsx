import React from 'react'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/dist/types/setup'
import '@testing-library/jest-dom/extend-expect'

import SignUp from './SignUp'

type SutTypes = {
    user: UserEvent
}
const makeSut = (): SutTypes => {
    const user = userEvent.setup()
    const history = createMemoryHistory({ initialEntries: ['/signup'] })
    render(
        <Router location={history.location} navigator={history}>
            <SignUp />
        </Router>
    )

    return {
        user,
    }
}

describe('SignUp', () => {
    test('Should mount component with initial state', () => {
        const validationError = 'Required Field'
        makeSut()

        const errorContainer = screen.getByTestId('error-container')
        const signInButton = screen.getByRole('button', {
            name: 'Sign Up',
        })

        expect(errorContainer.childElementCount).toBe(0)
        expect(signInButton).toBeDisabled()
        testFieldStatus('name', validationError)
        testFieldStatus('email', validationError)
        testFieldStatus('password', validationError)
        testFieldStatus('passwordConfirmation', validationError)
    })
})

const testFieldStatus = (field: string, validationError?: string): void => {
    const fieldStatus = screen.getByTestId(`${field}-status`)

    expect(fieldStatus.title).toBe(validationError || 'All good!')
    expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}
