import express, { Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'

const app = express()

app.use(cors())

//  parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes

app.use('/api/v1/users/', usersRouter)

// test route
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello Devs!')
})

export default app
