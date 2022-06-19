import faker from 'faker'

import { RemoteAuth } from './RemoteAuth'

import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'

import { AuthParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'
import { mockAccountModel, mockAuthParams } from '@/domain/test'

type SutTypes = {
    sut: RemoteAuth
    httpPostClientSpy: HttpPostClientSpy<AuthParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthParams, AccountModel>()

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

        await sut.auth(mockAuthParams())

        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct body', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = mockAuthParams()
        await sut.auth(authParams)

        expect(httpPostClientSpy.body).toEqual(authParams)
    })

    test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = mockAuthParams()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized,
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = mockAuthParams()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest,
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = mockAuthParams()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound,
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = mockAuthParams()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError,
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should return an AccountModel if HttpPostClient returns 200', async () => {
        const { sut, httpPostClientSpy } = makeSut()
        const authParams = mockAuthParams()
        const httpResult = mockAccountModel()

        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult,
        }

        const account = await sut.auth(authParams)

        expect(account).toEqual(httpResult)
    })
})
