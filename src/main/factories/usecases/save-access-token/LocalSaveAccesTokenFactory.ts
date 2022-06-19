import { LocalSaveAccesToken } from '@/data/usecases/save-access-token/LocalSaveAccessToken'
import { ISaveAccessToken } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/LocalStorageAdapterFactory'

export const makeLocalSaveAccessToken = (): ISaveAccessToken => {
    return new LocalSaveAccesToken(makeLocalStorageAdapter())
}
