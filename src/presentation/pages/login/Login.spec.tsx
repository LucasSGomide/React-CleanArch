import React from 'react'
import { render, screen } from '@testing-library/react'

import Login from './Login'

describe('Login', () => {
    test('Should not render spinner and error on first mount', () => {
        render(<Login />)

        const errorContainer = screen.getByTestId('error-container')
        expect(errorContainer.childElementCount).toBe(0)
    })
})
