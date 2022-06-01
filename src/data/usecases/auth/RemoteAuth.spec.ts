import faker from 'faker'

import { createMockAuthParams } from '@/domain/test/MockAuth'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'

import { HttpPostClientSpy } from '@/data/test/MockHttpClient'
import { HttpStatusCode } from '@/data/protocols/http/HttpReponse'

import { RemoteAuth } from './RemoteAuth'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'

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

    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = createMockAuthParams()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest,
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = createMockAuthParams()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound,
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = createMockAuthParams()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError,
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
})
