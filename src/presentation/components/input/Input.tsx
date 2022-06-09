import React from 'react'
import Styles from './input-styles.scss'

// Type input as a real "input" tag so the custom component can support all the same props
type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
    return (
        <div className={Styles.inputContainer}>
            <input {...props} />
            <span className={Styles.status}>🔴</span>
        </div>
    )
}

export default Input
