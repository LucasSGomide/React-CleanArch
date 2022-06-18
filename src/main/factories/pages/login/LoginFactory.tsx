import React from 'react'

import { Login } from '@/presentation/pages/'
import { RemoteAuth } from '@/data/usecases/auth/RemoteAuth'
import { AxiosHttpClient } from '@/infra/http/axios/client/AxiosHttpClient'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/validation-builder/ValidationBuilder'

export const makeLogin: React.FC = () => {
    // loginInfo:
    // email: mango@gmail.com
    // password: 12345

    const url = 'http://fordevs.herokuapp.com/api/login'
    const axiosHttpClient = new AxiosHttpClient()
    const remoteAuth = new RemoteAuth(url, axiosHttpClient)

    const validationComposite = ValidationComposite.build([
        ...ValidationBuilder.field('password').minLength(5).required().build(),
        ...ValidationBuilder.field('email').required().email().build(),
    ])

    return (
        <Login authentication={remoteAuth} validation={validationComposite} />
    )
}
