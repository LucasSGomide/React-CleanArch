import { AuthParams } from 'domain/usecases/IAuthentication'
import { IHttpPostClient } from '@/data/protocols/http/IHttpPostClient'

export class RemoteAuth {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: IHttpPostClient
    ) {}

    async auth(params: AuthParams): Promise<void> {
        await this.httpPostClient.post({ url: this.url, body: params })
    }
}
