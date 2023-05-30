import { User } from './users.model'

const findLastAssignedId = async () => {
  const lastId = await User.findOne({}, { id: -1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastId?.id
}

export const generatedUserID = async () => {
  const lastId = await findLastAssignedId()

  const currentId = lastId || (0).toString().padStart(8, '0')

  const incrementID = (parseInt(currentId) + 1).toString().padStart(8, '0')
  return incrementID
}
