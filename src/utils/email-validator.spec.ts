import { EmailValidatorAdapter } from './email-validator'

describe('Email validator adapter', () => {
  test('should return false for invalid email', async () => {
    const sut = new EmailValidatorAdapter()
    const invalidEmail = 'invalidEmail@mail.com'
    const isValid = sut.isValid(invalidEmail)
    expect(isValid).toBeFalsy()
  })

  test('should return true for valid email', async () => {})
})
