import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email validator adapter', () => {
  test('should return false for invalid email', async () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const invalidEmail = 'invalid_email@email.com'
    const isValid = sut.isValid(invalidEmail)
    expect(isValid).toBeFalsy()
  })

  test('should return true for valid email', async () => {
    const sut = makeSut()
    const invalidEmail = 'validEmail@mail.com'
    const isValid = sut.isValid(invalidEmail)
    expect(isValid).toBeTruthy()
  })

  test('should call validator with correct email', async () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const email = 'leonardo.freiitas@outlook.com'
    sut.isValid(email)
    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })
})
