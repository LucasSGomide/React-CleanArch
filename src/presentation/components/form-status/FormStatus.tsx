import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'

import Spinner from '../spinner/Spinner'
import FormContext from '@/presentation/context/form/FormContext'

const FormStatus: React.FC = () => {
    const {
        state: { isLoading },
        errorState: { main },
    } = useContext(FormContext)

    return (
        <div data-testid="error-container" className={Styles.errorContainer}>
            {isLoading && <Spinner className={Styles.spinner} />}
            {main && <span className={Styles.error}>{main}</span>}
        </div>
    )
}

export default FormStatus
