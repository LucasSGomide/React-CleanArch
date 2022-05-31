import faker from 'faker'
import { AuthParams } from '../usecases/IAuthentication'

export const createMockAuthParams = (): AuthParams => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
})
