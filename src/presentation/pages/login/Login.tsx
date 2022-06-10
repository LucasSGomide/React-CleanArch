import React, { useState } from 'react'
import Styles from './login-styles.scss'

import {
    LoginHeader,
    Input,
    FormStatus,
    Footer,
} from '@/presentation/components'
import FormContext from '@/presentation/context/form/FormContext'

type LoginState = {
    isLoading: boolean
    errorMessage: string
}

const Login: React.FC = () => {
    const [state] = useState<LoginState>({ isLoading: false, errorMessage: '' })

    return (
        <div className={Styles.login}>
            <LoginHeader />

            <FormContext.Provider value={state}>
                <form className={Styles.form}>
                    <h2>Login</h2>

                    <Input
                        type="email"
                        name="email"
                        placeholder="Your e-mail here..."
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="Your password here..."
                    />

                    <button disabled className={Styles.submit} type="submit">
                        Sign In
                    </button>
                    <span className={Styles.link}>Sign Up</span>

                    <FormStatus />
                </form>
            </FormContext.Provider>
            <Footer />
        </div>
    )
}

export default Login
