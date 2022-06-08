import React from 'react'
import Styles from './login-styles.scss'

import {
    LoginHeader,
    Input,
    FormStatus,
    Footer,
} from '@/presentation/components'

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <LoginHeader />
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

                <button className={Styles.submit} type="submit">
                    Sign In
                </button>
                <span className={Styles.link}>Sign Up</span>

                <FormStatus />
            </form>
            <Footer />
        </div>
    )
}

export default Login
