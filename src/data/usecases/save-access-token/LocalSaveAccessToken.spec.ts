import faker from 'faker'

import { LocalSaveAccesToken } from './LocalSaveAccessToken'
import { SetStorageMock } from '@/data/test'

type SutTypes = {
    sut: LocalSaveAccesToken
    setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalSaveAccesToken(setStorageMock)

    return {
        sut,
        setStorageMock,
    }
}

describe('LocalSaveAccesToken', () => {
    test('Should call SetStorage with correct access token', async () => {
        const { sut, setStorageMock } = makeSut()
        const accessToken = faker.random.uuid()
        // jest.spyOn(setStorageMock, 'set')

        await sut.save(accessToken)

        expect(setStorageMock.key).toBe('accessToken')
        expect(setStorageMock.value).toBe(accessToken)
        // expect(setStorageMock.set).toBeCalledWith('accessToken', accessToken)
    })

    test('Should throw if SetStorage throws', async () => {
        const { sut, setStorageMock } = makeSut()

        jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())

        const promise = sut.save(faker.random.uuid())

        await expect(promise).rejects.toThrow(new Error())
    })
})
