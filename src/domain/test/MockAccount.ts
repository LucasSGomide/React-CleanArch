import faker from 'faker'
import { AuthParams } from '@/domain/usecases/IAuthentication'
import { AccountModel } from '../models/AccountModel'

export const createMockAuthParams = (): AuthParams => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
})

export const createMockAccountModel = (): AccountModel => ({
    accessToken: faker.random.uuid(),
})
