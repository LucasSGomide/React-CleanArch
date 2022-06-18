import { IAuthentication } from '@/domain/usecases'
import { RemoteAuth } from '@/data/usecases/auth/RemoteAuth'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

export const makeRemoteAuth = (): IAuthentication => {
    return new RemoteAuth(makeApiUrl('/login'), makeAxiosHttpClient())
}
