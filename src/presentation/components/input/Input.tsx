import React, { useContext } from 'react'
import Styles from './input-styles.scss'

import FormContext from '@/presentation/context/form/FormContext'

// Type input as a real "input" tag so the custom component can support all the same props
type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
    const { errorState } = useContext(FormContext)

    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false
    }

    const getStatus = (): string => '🔴'

    const getTitle = (): string => errorState[props.name]

    return (
        <div className={Styles.inputContainer}>
            <input {...props} readOnly onFocus={enableInput} />
            <span
                data-testid={`${props.name}-status`}
                title={getTitle()}
                className={Styles.status}
            >
                {getStatus()}
            </span>
        </div>
    )
}

export default Input
