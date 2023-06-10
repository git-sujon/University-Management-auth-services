import express from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { userRoute } from './app/modules/user/user.route'
import APIError from './errors/ApiErrors'

const app = express()

app.use(cors())

//  parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes

app.use('/api/v1/users/', userRoute)




// test route
app.get('/', (req: Request, res: Response, next:NextFunction) => {
 throw new Error ("Banaj jjjd ")

})


// global error 

app.use(globalErrorHandler)



export default app
 