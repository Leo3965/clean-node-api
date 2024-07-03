import request from 'supertest'
import app from '../config/app'

describe('body parse middleware', () => {
  test('should parse body as json', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.status(200).send(req.body)
    })

    const body = { name: 'leonardo' }

    await request(app)
      .post('/test-body-parser')
      .send(body)
      .expect(200)
      .expect(body)
  })
})
