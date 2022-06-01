import { AccountModel } from '@/domain/models'
import { AuthParams, IAuthentication } from 'domain/usecases'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'

import { IHttpPostClient, HttpStatusCode } from '@/data/protocols/http'

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
