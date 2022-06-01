import { AuthParams } from 'domain/usecases/IAuthentication'
import { IHttpPostClient } from '@/data/protocols/http/IHttpPostClient'
import { HttpStatusCode } from '@/data/protocols/http/HttpReponse'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'

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
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError()
        }
    }
}
