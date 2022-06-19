import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './LocalStorageAdapter'

describe('LocalStorageAdapter', () => {
    test('Should call localStorage setItem method with correct values', async () => {
        const key = faker.database.column()
        const value = faker.random.uuid()

        const sut = new LocalStorageAdapter()

        await sut.set(key, value)

        expect(localStorage.setItem).toBeCalledWith(key, value)
    })
})
