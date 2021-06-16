import {privateAPI} from './API'

export default {

    storeComment: async (payload) => {
        return privateAPI.post('/secure/comments', payload)
    },
}