import {privateAPI} from './API'

export default {

    fetchDesign: async (designId) => {
        return privateAPI.get('/dyo/design/' + designId)
    },
}