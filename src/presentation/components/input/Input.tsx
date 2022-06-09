import React from 'react'
import Styles from './input-styles.scss'

// Type input as a real "input" tag so the custom component can support all the same props
type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false
    }

    return (
        <div className={Styles.inputContainer}>
            <input {...props} readOnly onFocus={enableInput} />
            <span className={Styles.status}>🔴</span>
        </div>
    )
}

export default Input
