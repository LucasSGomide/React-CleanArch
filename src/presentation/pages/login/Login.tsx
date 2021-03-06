import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Link, useNavigate } from 'react-router-dom'

import { IAuthentication, ISaveAccessToken } from '@/domain/usecases'
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
    authentication: IAuthentication
    saveAccessToken: ISaveAccessToken
}

const Login: React.FC<LoginProps> = ({
    validation,
    authentication,
    saveAccessToken,
}) => {
    const navigate = useNavigate()
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

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault()

        try {
            if (state.isLoading || state.passwordError || state.emailError) {
                return
            }

            setState((prevState) => ({
                ...prevState,
                isLoading: true,
            }))

            const account = await authentication.auth({
                email: state.email,
                password: state.password,
            })

            await saveAccessToken.save(account.accessToken)
            navigate('/')
        } catch (err) {
            setState((prevstate) => ({
                ...prevstate,
                requestError: err.message,
                isLoading: false,
            }))
        }
    }

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <form
                className={Styles.form}
                onSubmit={handleSubmit}
                name="login-form"
            >
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
                <Link to="/signup" className={Styles.link}>
                    Sign Up
                </Link>

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
