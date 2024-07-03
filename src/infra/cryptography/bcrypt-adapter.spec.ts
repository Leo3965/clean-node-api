import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => {
      resolve('hash')
    })
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter()
}

describe('BCrypt Cryptography', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any value')
    expect(hashSpy).toHaveBeenCalledWith('any value', 12)
  })

  test('Should return hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any value')
    expect(hash).toBe('hash')
  })

  test('should throws if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt('any value')
    await expect(promise).rejects.toThrow()
  })
})
