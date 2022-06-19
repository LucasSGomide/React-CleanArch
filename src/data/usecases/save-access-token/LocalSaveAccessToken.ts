import { ISetStorage } from '@/data/protocols/cache/SetStorage'
import { ISaveAccessToken } from '@/domain/usecases'

export class LocalSaveAccesToken implements ISaveAccessToken {
    constructor(private readonly setStorage: ISetStorage) {}

    async save(accessToken: string): Promise<void> {
        await this.setStorage.set('accessToken', accessToken)
    }
}
