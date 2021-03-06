import faker from 'faker'

import { AuthParams } from '@/domain/usecases'
import { AccountModel } from '../models'

export const createMockAuthParams = (): AuthParams => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
})

export const createMockAccountModel = (): AccountModel => ({
    accessToken: faker.random.uuid(),
})
