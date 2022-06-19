import { ISetStorage } from '@/data/protocols/cache/SetStorage'

export class SetStorageMock implements ISetStorage {
    key: string
    value: any

    async set(key: string, value: string): Promise<void> {
        this.key = key
        this.value = value
        // localStorage.setItem(key, value)
    }
}
