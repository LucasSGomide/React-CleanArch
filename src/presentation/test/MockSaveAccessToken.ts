import { ISaveAccessToken } from '@/domain/usecases'

export class SaveAccesTokenMock implements ISaveAccessToken {
    accessToken: string

    async save(accessToken: string): Promise<void> {
        this.accessToken = accessToken
    }
}
