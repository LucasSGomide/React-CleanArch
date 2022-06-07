import axios from 'axios'
import faker from 'faker'

import { AxiosHttpClient } from './AxiosHttpClient'

import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosPostResult = {
    data: faker.random.objectElement(),
    status: faker.random.number(),
}

mockedAxios.post.mockResolvedValue(mockedAxiosPostResult)

const makeSut = (): AxiosHttpClient => {
    const sut = new AxiosHttpClient()

    return sut
}

const mockPostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement(),
})

describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async () => {
        const request = mockPostRequest()
        const sut = makeSut()

        await sut.post(request)

        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct status code and body', async () => {
        const sut = makeSut()

        const httpResponse = await sut.post(mockPostRequest())

        expect(httpResponse).toEqual({
            statusCode: mockedAxiosPostResult.status,
            body: mockedAxiosPostResult.data,
        })
    })
})
