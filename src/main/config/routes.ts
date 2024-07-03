import { Express, Router } from 'express'
import signUpRoute from '../routes/sign-up-route'

export default (app: Express): void => {
  const router = Router()
  signUpRoute(router)
  app.use('/api', router)
}
