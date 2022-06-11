import React, { useState } from 'react'
import Styles from './login-styles.scss'

import {
    LoginHeader,
    Input,
    FormStatus,
    Footer,
} from '@/presentation/components'

export type InputError = {
    email: string
    password: string
    requestError: string
}

const Login: React.FC = () => {
    const [state] = useState({
        isLoading: false,
    })

    const [inputError] = useState<InputError>({
        email: 'Required field',
        password: 'Required field',
        requestError: '',
    })

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <form className={Styles.form}>
                <h2>Login</h2>

                <Input
                    errorMessage={inputError.email}
                    type="email"
                    name="email"
                    placeholder="Your e-mail here..."
                />

                <Input
                    errorMessage={inputError.password}
                    type="password"
                    name="password"
                    placeholder="Your password here..."
                />

                <button disabled className={Styles.submit} type="submit">
                    Sign In
                </button>
                <span className={Styles.link}>Sign Up</span>

                <FormStatus
                    isLoading={state.isLoading}
                    errorMessage={inputError.requestError}
                />
            </form>
            <Footer />
        </div>
    )
}

export default Login
