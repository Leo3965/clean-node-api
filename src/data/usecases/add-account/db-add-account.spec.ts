import { DbAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountRepository } from '../../protocols/add-account-repository'

interface SutTypes {
  sut: DbAddAccount
  encrypter: Encrypter
  repository: AddAccountRepository
}

const makeAddAccountRepository = (): any => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAcc = {
        id: 'valid id',
        name: 'valid name',
        email: 'valid email',
        password: 'hashed password'
      }
      return new Promise((resolve) => {
        resolve(fakeAcc)
      })
    }
  }

  return new AddAccountRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed password')
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypter: encrypterStub,
    repository: addAccountRepositoryStub
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

  test('should throws if encrypter throws', async () => {
    const { sut, encrypter } = makeSut()
    jest.spyOn(encrypter, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const accountData = {
      name: 'valid name',
      email: 'valid email',
      password: 'valid password'
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('should call addAccountRepository with correct values', async () => {
    const { sut, repository } = makeSut()
    const addSpy = jest.spyOn(repository, 'add')
    const accountData = {
      name: 'valid name',
      email: 'valid email',
      password: 'valid password'
    }

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid name',
      email: 'valid email',
      password: 'hashed password'
    })
  })

  test('should throws if addAccountRepository throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const accountData = {
      name: 'valid name',
      email: 'valid email',
      password: 'valid password'
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
