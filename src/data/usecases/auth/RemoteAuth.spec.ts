import faker from 'faker'

import { createMockAuthParams } from '@/domain/test/MockAuth'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'

import { HttpPostClientSpy } from '@/data/test/MockHttpClient'
import { HttpStatusCode } from '@/data/protocols/http/HttpReponse'

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

        await sut.auth(createMockAuthParams())

        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = createMockAuthParams()
        await sut.auth(authParams)

        expect(httpPostClientSpy.body).toEqual(authParams)
    })

    test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = createMockAuthParams()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized,
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
})
