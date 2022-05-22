import faker from 'faker'
import { AuthParams } from '../usecases/IAuthentication'

export const makeMockAuthParams = (): AuthParams => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
})
