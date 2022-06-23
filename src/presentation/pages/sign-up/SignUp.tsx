import React, { useState } from 'react'
import Styles from './sign-up-styles.scss'
import { Link } from 'react-router-dom'

import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'

const SignUp: React.FC = () => {
    const [state] = useState({
        isLoading: false,
        nameError: 'Required Field',
        emailError: 'Required Field',
        passwordError: 'Required Field',
        passwordConfirmationError: 'Required Field',
        requestError: '',
    })

    const { isLoading, nameError, emailError, passwordError, passwordConfirmationError } = state

    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <form className={Styles.form} name="signup-form">
                <h2>Create Account</h2>

                <Input
                    type="text"
                    name="name"
                    placeholder="Your name here..."
                    errorMessage={nameError}
                />

                <Input
                    type="email"
                    name="email"
                    placeholder="Your e-mail here..."
                    errorMessage={emailError}
                />

                <Input
                    type="password"
                    name="password"
                    placeholder="Your password here..."
                    errorMessage={passwordError}
                />

                <Input
                    errorMessage={passwordConfirmationError}
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirm your password..."
                />

                <button disabled className={Styles.submit} type="submit">
                    Sign Up
                </button>
                <Link to="/login" className={Styles.link}>
                    Back to Login
                </Link>

                <FormStatus isLoading={isLoading} errorMessage={''} />
            </form>
            <Footer />
        </div>
    )
}

export default SignUp
