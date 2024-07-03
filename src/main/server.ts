import app from './config/app'
import config from '../utils/config'

const PORT = config.port || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
