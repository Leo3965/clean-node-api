import { DbAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'

interface SutTypes {
  sut: DbAddAccount
  encrypter: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed password' + value)
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypter: encrypterStub
  }
}

describe('DbAddAccount', () => {
  test('should call encrypt with correct password', async () => {
    const { sut, encrypter } = makeSut()
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    const accountData = {
      name: 'valid name',
      email: 'valid email',
      password: 'valid password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })
  test('should be able to add account', async () => {})
})
