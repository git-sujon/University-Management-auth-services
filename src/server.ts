import mongoose from 'mongoose'
import app from './app'
import config from './config'

const port = config.port

async function connectToMongoDB() {
  try {
    await mongoose.connect(`${config.database_url}`)
    console.log('Database Connection Successfully')

    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  } catch (error) {
    console.log('Database connection Error:', error)
  }
}

connectToMongoDB().catch(err => console.log(err))
