import { RequestHandler } from 'express'
import { userServices } from './user.services'


const createUserController: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body

    const result = await userServices.createUser(user)

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const userController = {
  createUserController
}