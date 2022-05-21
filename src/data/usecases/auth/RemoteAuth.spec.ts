import { IHttpPostClient } from '../../protocols/http/IHttpPostClient'
import { RemoteAuth } from './RemoteAuth'

class HttpPostClientSpy implements IHttpPostClient {
    url?: string

    async post(url: string): Promise<void> {
        this.url = url
        return await Promise.resolve()
    }
}

describe('RemoteAuth', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = 'ANY_URL'
        const httpPostClientSpy = new HttpPostClientSpy()

        const sut = new RemoteAuth(url, httpPostClientSpy)
        await sut.auth()

        expect(httpPostClientSpy.url).toBe(url)
    })
})
