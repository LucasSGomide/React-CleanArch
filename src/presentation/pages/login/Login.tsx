import React from 'react'
import Styles from './login-styles.scss'

import Spinner from '@/presentation/components/spinner/Spinner'
import Header from '@/presentation/components/login/LoginHeader'
import Footer from '@/presentation/components/footer/Footer'
import Input from '@/presentation/components/input/Input'

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

                <div className={Styles.errorContainer}>
                    <Spinner className={Styles.spinner} />
                    <span className={Styles.error}>Erro</span>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default Login
