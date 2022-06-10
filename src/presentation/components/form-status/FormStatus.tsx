import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'

import Spinner from '../spinner/Spinner'
import FormContext from '@/presentation/context/form/FormContext'

const FormStatus: React.FC = () => {
    const { isLoading, errorMessage } = useContext(FormContext)

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
