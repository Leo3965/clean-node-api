import { LogControllerDecorator } from './log-controller-decorator'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'

interface SubTypes {
  sut: LogControllerDecorator
  stub: Controller
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(_: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve({
        body: {
          name: 'Leonardo'
        },
        statusCode: 200
      })
    }
  }

  return new ControllerStub()
}

const makeSut = (): SubTypes => {
  const controllerStub = makeController()
  const log = new LogControllerDecorator(controllerStub)
  return {
    sut: log,
    stub: controllerStub
  }
}

describe('LogControllerDecorator', () => {
  test('should call controller handle', async () => {
    const { sut, stub } = makeSut()
    const spy = jest.spyOn(stub, 'handle')
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
