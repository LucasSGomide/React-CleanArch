import { AccountModel } from '@/domain/models/AccountModel'

export type AuthParams = {
    email: string
    password: string
}

export interface IAuthentication {
    auth: (params: AuthParams) => Promise<AccountModel>
}
