import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, RenderResult } from '@testing-library/react'

import Login from './Login'

type SutTypes = RenderResult

const makeSut = (): SutTypes => {
    return render(<Login />)
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
})
