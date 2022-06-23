import { screen, within } from '@testing-library/react'

export const testFieldStatus = (field: string, validationError?: string): void => {
    const fieldStatus = screen.getByTestId(`${field}-status`)

    expect(fieldStatus.title).toBe(validationError || 'All good!')
    expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testButtonIsDisabled = (name: string): void => {
    const signInButton = screen.getByRole('button', {
        name,
    })
    expect(signInButton).toBeDisabled()
}

export const testButtonIsEnabled = (name: string): void => {
    const signInButton = screen.getByRole('button', {
        name,
    })
    expect(signInButton).toBeEnabled()
}

export const testChildCount = (fieldName: string, count: number): void => {
    const element = screen.getByTestId(fieldName)
    expect(element.childElementCount).toBe(count)
}

export const getButtonElement = (name: string): HTMLElement => {
    return screen.getByRole('button', { name: 'Sign In' })
}

export const testRequestError = (error: Error): void => {
    const errorContainer = screen.getByTestId('error-container')
    const errorMessage = within(errorContainer).getByText(error.message)

    expect(errorContainer.childElementCount).toBe(1)
    expect(errorMessage).toBeInTheDocument()
}
