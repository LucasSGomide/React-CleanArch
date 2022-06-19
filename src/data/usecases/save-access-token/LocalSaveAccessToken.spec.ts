import faker from 'faker'

import { LocalSaveAccesToken } from './LocalSaveAccessToken'
import { SetStorageSpy } from '@/data/test/MockStorage'

type SutTypes = {
    sut: LocalSaveAccesToken
    setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccesToken(setStorageSpy)

    return {
        sut,
        setStorageSpy,
    }
}

describe('LocalSaveAccesToken', () => {
    test('Should call SetStorage with correct access token', async () => {
        const accessToken = faker.random.uuid()
        const { sut, setStorageSpy } = makeSut()
        // jest.spyOn(setStorageSpy, 'set')

        await sut.save(accessToken)

        expect(setStorageSpy.key).toBe('accessToken')
        expect(setStorageSpy.value).toBe(accessToken)
        // expect(setStorageSpy.set).toBeCalledWith('accessToken', accessToken)
    })
})
