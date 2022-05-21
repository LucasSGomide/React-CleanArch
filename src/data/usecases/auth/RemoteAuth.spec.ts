import { HttpPostClientSpy } from '../../test/MockHttpClient'
import { RemoteAuth } from './RemoteAuth'

describe('RemoteAuth', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = 'ANY_URL'
        const httpPostClientSpy = new HttpPostClientSpy()

        const sut = new RemoteAuth(url, httpPostClientSpy)
        await sut.auth()

        expect(httpPostClientSpy.url).toBe(url)
    })
})
