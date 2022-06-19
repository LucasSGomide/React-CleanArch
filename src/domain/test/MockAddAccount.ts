import faker from 'faker'

import { AddAccountParams } from '../usecases'

export const mockAddAccountParams = (): AddAccountParams => {
    const fakePassword = faker.internet.password()
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: fakePassword,
        passwordConfirmation: fakePassword,
    }
}
