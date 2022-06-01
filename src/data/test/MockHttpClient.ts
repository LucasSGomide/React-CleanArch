import {
    HttpPostParams,
    IHttpPostClient,
} from '@/data/protocols/http/IHttpPostClient'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/HttpReponse'

export class HttpPostClientSpy implements IHttpPostClient {
    url?: string
    body?: object
    response: HttpResponse = {
        statusCode: HttpStatusCode.ok,
    }

    async post(params: HttpPostParams): Promise<HttpResponse> {
        this.url = params.url
        this.body = params.body
        return await Promise.resolve(this.response)
    }
}
