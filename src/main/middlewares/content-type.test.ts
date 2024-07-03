import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test-content-type', (req, res) => {
      res.status(200).send()
    })

    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })

  test('should return xml as content type when forced', async () => {
    app.get('/test-content-type-xml', (req, res) => {
      res.type('text/xml')
      res.status(200).send()
    })

    await request(app)
      .get('/test-content-type-xml')
      .expect('content-type', /xml/)
  })
})
