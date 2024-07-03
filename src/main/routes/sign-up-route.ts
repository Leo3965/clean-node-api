import { Router } from 'express'
import { SignUpControllerFactory } from '../factories/signup'
import { AdapterRoute } from '../adapters/express-route-adapter'

const signUpRoute = (router: Router): void => {
  router.post('/signup', AdapterRoute(SignUpControllerFactory()))
}

export default signUpRoute
