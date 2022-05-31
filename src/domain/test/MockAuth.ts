import faker from 'faker'
import { AuthParams } from '@/domain/usecases/IAuthentication'

export const createMockAuthParams = (): AuthParams => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
})
