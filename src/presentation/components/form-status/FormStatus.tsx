import React from 'react'
import Styles from './form-status-styles.scss'

import Spinner from '../spinner/Spinner'

type FormStatusProps = {
    isLoading: boolean
    errorMessage: string
}

const FormStatus: React.FC<FormStatusProps> = ({
    isLoading,
    errorMessage,
}: FormStatusProps) => {
    return (
        <div data-testid="error-container" className={Styles.errorContainer}>
            {isLoading && <Spinner className={Styles.spinner} />}
            {errorMessage && (
                <span className={Styles.error}>{errorMessage}</span>
            )}
        </div>
    )
}

export default FormStatus
