import {publicAPI, privateAPI} from './API'

export default {

    fetchUser: async (userId) => {
        return privateAPI.get('/secure/users/' + userId)
    },

    login(payload) {
        return publicAPI.post('/login', payload)
    },

}