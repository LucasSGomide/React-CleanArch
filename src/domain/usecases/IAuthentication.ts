import { AccountModel } from '../models/AccountModel'

type AuthParams = {
    email: string
    password: string
}

export interface IAuthentication {
    auth: (params: AuthParams) => Promise<AccountModel>
}
