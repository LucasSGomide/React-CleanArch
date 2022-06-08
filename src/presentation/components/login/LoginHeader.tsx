import React, { memo } from 'react'
import Styles from './login-header-styles.scss'

import Logo from '@/presentation/components/logo/Logo'

const LoginHeader: React.FC = () => {
    return (
        <header className={Styles.header}>
            <Logo />
            <h1>React - Clean Architecture - Polls</h1>
        </header>
    )
}

// memo will avoid the component to re-render several times due to state changes in a specific screen.
export default memo(LoginHeader)
