import { AccountModel } from '@/domain/models'
import { createMockAccountModel } from '@/domain/test'
import { AuthParams, IAuthentication } from '@/domain/usecases'

export class AuthenticationSpy implements IAuthentication {
    account = createMockAccountModel()
    params: AuthParams

    async auth(params: AuthParams): Promise<AccountModel> {
        this.params = params

        return this.account
    }
}
