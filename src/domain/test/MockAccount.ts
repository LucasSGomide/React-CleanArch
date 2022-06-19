import faker from 'faker'

import { AuthParams } from '@/domain/usecases'
import { AccountModel } from '../models'

export const mockAuthParams = (): AuthParams => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
})

export const mockAccountModel = (): AccountModel => ({
    accessToken: faker.random.uuid(),
})
