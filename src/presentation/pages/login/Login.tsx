import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'

import { IValidation } from '@/presentation/protocols/Validation'
import {
    LoginHeader,
    Input,
    FormStatus,
    Footer,
} from '@/presentation/components'

type LoginState = {
    isLoading: boolean
    email: string
    password: string
    emailError: string
    passwordError: string
    requestError: string
}

type LoginProps = {
    validation: IValidation
}

const Login: React.FC<LoginProps> = ({ validation }) => {
    const [state, setState] = useState<LoginState>({
        isLoading: false,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        requestError: '',
    })

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            emailError: validation.validate('email', state.email),
        }))
    }, [state.email])

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            passwordError: validation.validate('password', state.password),
        }))
    }, [state.password])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }))
    }

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <form className={Styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>

                <Input
                    errorMessage={state.emailError}
                    type="email"
                    name="email"
                    placeholder="Your e-mail here..."
                    onInputChange={setState}
                />

                <Input
                    errorMessage={state.passwordError}
                    type="password"
                    name="password"
                    placeholder="Your password here..."
                    onInputChange={setState}
                />

                <button
                    disabled={!!state.passwordError || !!state.emailError}
                    className={Styles.submit}
                    type="submit"
                >
                    Sign In
                </button>
                <span className={Styles.link}>Sign Up</span>

                <FormStatus
                    isLoading={state.isLoading}
                    errorMessage={state.requestError}
                />
            </form>
            <Footer />
        </div>
    )
}

export default Login
