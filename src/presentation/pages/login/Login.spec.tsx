import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import Login from './Login'

describe('Login', () => {
    test('Should mount component with initial state', () => {
        render(<Login />)

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
