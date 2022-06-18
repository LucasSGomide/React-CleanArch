import { AxiosHttpClient } from '@/infra/http/axios/client/AxiosHttpClient'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}
