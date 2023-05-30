import config from '../../../config/index'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generatedUserID } from './users.util'

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
    throw new Error('Failed to created a user!')
  }

  return creteUser
}

export default {
  createUser,
}
