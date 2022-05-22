import { makeMockAuthParams } from '../../../domain/test/MockAuth'
import faker from 'faker'

import { HttpPostClientSpy } from '../../test/MockHttpClient'
import { RemoteAuth } from './RemoteAuth'

type SutTypes = {
    sut: RemoteAuth
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()

    const sut = new RemoteAuth(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy,
    }
}

describe('RemoteAuth', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy } = makeSut(url)

        await sut.auth(makeMockAuthParams())

        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = makeMockAuthParams()
        await sut.auth(authParams)

        expect(httpPostClientSpy.body).toEqual(authParams)
    })
})
