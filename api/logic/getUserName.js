import validate from 'com/validate.js'
import { User } from '../data/index.js'
import { SystemError, NotFoundError } from 'com/errors.js'

const getUserName = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')

                return
            }

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user)
                        throw new NotFoundError('targetUser not found')

                    return user.name
                })
        })
}

export default getUserName