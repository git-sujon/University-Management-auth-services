import config from '../../../config/index'
import APIError from '../../../errors/ApiErrors'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedUserID } from './user.util'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // default increment ID

  const id = await generatedUserID()

  user.id = id

  // default DEFAULT_PASSWORD
  if (!user.password) {
    user.password = config.Default_password as string
  }

  const creteUser = await User.create(user)

  if (!createUser) {
    throw new APIError(400, 'Failed to created a user!')
  }

  return creteUser
}

export const userServices = {
  createUser
}