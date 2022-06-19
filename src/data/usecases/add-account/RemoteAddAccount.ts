import { HttpStatusCode, IHttpPostClient } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AddAccountParams, IAddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements IAddAccount {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: IHttpPostClient<
            AddAccountParams,
            AccountModel
        >
    ) {}

    async add(params: AddAccountParams): Promise<AccountModel> {
        const httpReponse = await this.httpPostClient.post({
            url: this.url,
            body: params,
        })

        switch (httpReponse.statusCode) {
            case HttpStatusCode.forbidden:
                throw new EmailInUseError()
            case HttpStatusCode.badRequest:
                throw new UnexpectedError()
            default:
                return null
        }
    }
}
