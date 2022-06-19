import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { AuthParams, IAuthentication } from '@/domain/usecases'

export class AuthenticationSpy implements IAuthentication {
    account = mockAccountModel()
    params: AuthParams
    callsCount = 0

    async auth(params: AuthParams): Promise<AccountModel> {
        this.params = params
        this.callsCount++

        return this.account
    }
}
