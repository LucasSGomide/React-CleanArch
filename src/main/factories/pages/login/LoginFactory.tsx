import React from 'react'

import { Login } from '@/presentation/pages/'
import { makeRemoteAuth } from '../../usecases/auth/RemoteAuthFactory'
import { makeLoginValidation } from './LoginValidationFactory'

export const makeLogin: React.FC = () => {
    // loginInfo:
    // email: mango@gmail.com
    // password: 12345

    return (
        <Login
            authentication={makeRemoteAuth()}
            validation={makeLoginValidation()}
        />
    )
}
