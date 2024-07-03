import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => {
      resolve('hash')
    })
  }
}))

describe('BCrypt Cryptography', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any value')
    expect(hashSpy).toHaveBeenCalledWith('any value', 12)
  })

  test('Should return hash on success', async () => {
    const sut = new BcryptAdapter()
    const hash = await sut.encrypt('any value')
    expect(hash).toBe('hash')
  })
})
