import {privateAPI} from './API'

export default {
    fetchFonts: async () => {
        return privateAPI.get('/system/fonts')
    },

    fetchLookAndFeels: async () => {
        return privateAPI.get('/system/look-and-feels')
    },


    fetchFontColors: async () => {
        return privateAPI.get('/system/colors/front-colors')
    },

    fetchDesignBankLogos: async () => {
        return privateAPI.get('/system/design-bank/logos')
    },

    fetchPrintTypes: async () => {
        return privateAPI.get('/system/print-types')
    },

    fetchColors: async () => {
        return privateAPI.get('/system/colors')
    },
}