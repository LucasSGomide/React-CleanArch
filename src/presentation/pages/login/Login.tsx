import React from 'react'
import Styles from './login-styles.scss'

import Spinner from '@/presentation/components/spinner/Spinner'
import Header from '@/presentation/components/login/LoginHeader'
import Footer from '@/presentation/components/footer/Footer'

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <Header />
            <form className={Styles.form}>
                <h2>Login</h2>
                <div className={Styles.inputContainer}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your e-mail..."
                    />
                    <span className={Styles.status}>🔴</span>
                </div>

                <div className={Styles.inputContainer}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Your password..."
                    />
                    <span className={Styles.status}>🔴</span>
                </div>
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
