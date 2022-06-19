import React from 'react'
import Styles from './sign-up-styles.scss'
import { Link } from 'react-router-dom'

import {
    LoginHeader,
    Input,
    FormStatus,
    Footer,
} from '@/presentation/components'

const SignUp: React.FC = () => {
    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <form className={Styles.form} name="signup-form">
                <h2>Create Account</h2>

                <Input
                    type="text"
                    name="name"
                    placeholder="Your name here..."
                />

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

                <Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirm your password..."
                />

                <button className={Styles.submit} type="submit">
                    Sign Up
                </button>
                <Link to="/login" className={Styles.link}>
                    Back to Login
                </Link>

                <FormStatus isLoading={false} errorMessage={''} />
            </form>
            <Footer />
        </div>
    )
}

export default SignUp
