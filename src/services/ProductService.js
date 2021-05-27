import {privateAPI} from './API'

export default {

    fetchProduct: async (id) => {
        return privateAPI.get('/products/' + id)
    },
}