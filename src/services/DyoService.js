import {privateAPI} from './API'

export default {

    fetchDesign: async (designId) => {
        return privateAPI.get('/dyo/design/' + designId)
    },

    updateDesignerStatus: async (designId, payload) => {
        return privateAPI.put('/secure/designer/dyo-order-item/update-designer-status/' + designId, payload)
    },

    updateFrontImageSnapshot: async (designId, payload) => {
        return privateAPI.put('/secure/update-data/dyo/front-image-snapshot/' + designId, payload)
    },

    updateBackImageSnapshot: async (designId, payload) => {
        return privateAPI.put('/secure/update-data/dyo/back-image-snapshot/' + designId, payload)
    },
}