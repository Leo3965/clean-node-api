import app from './config/app'
import config from '../utils/config'
import { MongoHelper } from '../infra/db/mongodb/helpers/helper'

const PORT = config.port || 3000

MongoHelper.connect()
  .catch((err) => {
    console.error(err)
    process.exit(-1)
  })
  .then((): void => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(() => { console.log('Error running App') })
