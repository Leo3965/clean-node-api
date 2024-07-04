import { LogControllerDecorator } from './log-controller-decorator'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'

describe('LogControllerDecorator', () => {
  test('should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return Promise.resolve({
          body: {
            name: 'Leonardo'
          },
          statusCode: 200
        })
      }
    }

    const controllerStub = new ControllerStub()
    const spy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRq: HttpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRq)

    expect(spy).toHaveBeenCalledWith(httpRq)
  })
})
