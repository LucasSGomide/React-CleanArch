import { AuthParams } from 'domain/usecases/IAuthentication'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'

import { IHttpPostClient } from '@/data/protocols/http/IHttpPostClient'
import { HttpStatusCode } from '@/data/protocols/http/HttpReponse'

export class RemoteAuth {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: IHttpPostClient
    ) {}

    async auth(params: AuthParams): Promise<void> {
        const httpReponse = await this.httpPostClient.post({
            url: this.url,
            body: params,
        })

        switch (httpReponse.statusCode) {
            case HttpStatusCode.ok:
                break
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError()
            default:
                throw new UnexpectedError()
        }
    }
}
