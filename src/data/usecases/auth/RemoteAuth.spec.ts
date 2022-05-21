import { HttpPostClientSpy } from '../../test/MockHttpClient'
import { RemoteAuth } from './RemoteAuth'

type SutTypes = {
    sut: RemoteAuth
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'ANY_URL'): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()

    const sut = new RemoteAuth(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy,
    }
}

describe('RemoteAuth', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = 'ANY_URL'
        const { sut, httpPostClientSpy } = makeSut(url)

        await sut.auth()

        expect(httpPostClientSpy.url).toBe(url)
    })
})
