import React from 'react'
import Styles from './input-styles.scss'

type InputProps = {
    type: string
    name: string
    placeholder: string
    errorMessage: string
    onInputChange: React.Dispatch<React.SetStateAction<any>>
}

const Input: React.FC<InputProps> = ({
    type,
    name,
    placeholder,
    errorMessage,
    onInputChange,
}: InputProps) => {
    const getStatus = (): string => (errorMessage ? '🔴' : '🟢')

    const getTitle = (): string => errorMessage || 'All good!'

    const handleChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>): void => {
        onInputChange((prev) => ({
            ...prev,
            [target.name]: target.value,
        }))
    }

    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false
    }

    return (
        <div className={Styles.inputContainer}>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                readOnly
                onFocus={enableInput}
                onChange={handleChange}
            />
            <span
                data-testid={`${name}-status`}
                title={getTitle()}
                className={Styles.status}
            >
                {getStatus()}
            </span>
        </div>
    )
}

export default Input
