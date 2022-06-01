import { AuthParams, IAuthentication } from 'domain/usecases/IAuthentication'
import { AccountModel } from '@/domain/models/AccountModel'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'

import { IHttpPostClient } from '@/data/protocols/http/IHttpPostClient'
import { HttpStatusCode } from '@/data/protocols/http/HttpReponse'

export class RemoteAuth implements IAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: IHttpPostClient<
            AuthParams,
            AccountModel
        >
    ) {}

    async auth(params: AuthParams): Promise<AccountModel> {
        const httpReponse = await this.httpPostClient.post({
            url: this.url,
            body: params,
        })

        switch (httpReponse.statusCode) {
            case HttpStatusCode.ok:
                return httpReponse.body
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError()
            default:
                throw new UnexpectedError()
        }
    }
}
