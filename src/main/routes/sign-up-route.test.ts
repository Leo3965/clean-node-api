import app from '../config/app'
import request from 'supertest'

describe('SignUp Route', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Leonardo',
        email: 'leonardo@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
      .expect({ ok: 'ok' })
  })
})
