import express, { Express } from 'express'
import bodyParser from '../middlewares/body-parse'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(express.urlencoded({ extended: true }))
  app.use(cors)
}
