import faker from 'faker'

import { LocalSaveAccesToken } from './LocalSaveAccessToken'
import { SetStorageSpy } from '@/data/test/MockStorage'

describe('LocalSaveAccesToken', () => {
    test('Should call SetStorage with correct access token', async () => {
        const accessToken = faker.random.uuid()
        const setStorageSpy = new SetStorageSpy()
        jest.spyOn(setStorageSpy, 'set')

        const sut = new LocalSaveAccesToken(setStorageSpy)

        await sut.save(accessToken)

        expect(setStorageSpy.key).toBe('accessToken')
        expect(setStorageSpy.value).toBe(accessToken)
        // expect(setStorageSpy.set).toBeCalledWith('accessToken', accessToken)
    })
})
