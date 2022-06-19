import { ISetStorage } from '@/data/protocols/cache/SetStorage'
import { LocalStorageAdapter } from '@/infra/cache/LocalStorageAdapter'

export const makeLocalStorageAdapter = (): ISetStorage => {
    return new LocalStorageAdapter()
}
