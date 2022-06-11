import React from 'react'
import Styles from './input-styles.scss'

type InputProps = {
    type: string
    name: string
    placeholder: string
    errorMessage: string
}

const Input: React.FC<InputProps> = ({
    type,
    name,
    placeholder,
    errorMessage,
}: InputProps) => {
    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false
    }

    const getStatus = (): string => '🔴'

    const getTitle = (): string => errorMessage

    return (
        <div className={Styles.inputContainer}>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                readOnly
                onFocus={enableInput}
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
