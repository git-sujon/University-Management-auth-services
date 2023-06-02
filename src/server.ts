import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { infoLogger, errorLogger } from './shared/logger'

const port = config.port

async function connectToMongoDB() {
  try {
    await mongoose.connect(`${config.database_url}`)
    infoLogger.info('Database Connection Successfully')

    app.listen(port, () => {
      infoLogger.info(`listening on port ${port}`)
    })
  } catch (error) {
    errorLogger.error('Database connection Error:', error)
  }
}

connectToMongoDB().catch(err => errorLogger.error(err))
