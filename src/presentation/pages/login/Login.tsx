import React from 'react'
import Styles from './login-styles.scss'

import Header from '@/presentation/components/login/LoginHeader'
import Input from '@/presentation/components/input/Input'
import FormStatus from '@/presentation/components/form-status/FormStatus'
import Footer from '@/presentation/components/footer/Footer'

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <Header />
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
