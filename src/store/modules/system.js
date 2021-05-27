import SystemService from '@/services/SystemService';

const state = () => ({
    fonts: [],
    fontColors: [],
    designBankLogos: [],
    loadingFonts: false,
    loadingFontColors: false,
    loadingDesignBankLogos: false,
    printTypes: [],
})

const getters = {
    getApiUrl: () => {
        return process.env.VUE_APP_API_URL;
    },

    getDesignBankLogoUrl: () => {
        return process.env.VUE_APP_IMAGE_BASE_URL + "design_bank/images";
    }
}

const mutations = {
    SET_FETCH_FONTS_SUCCESS(state, fonts) {
        state.fonts = fonts;
    },

    SET_FETCH_FONT_COLORS_SUCCESS(state, fontColors) {
        state.fontColors = fontColors;
    },

    SET_FETCH_DESIGN_BANK_LOGOS_SUCCESS(state, designBankLogos) {
        state.designBankLogos = designBankLogos;
    },

    SET_FETCH_PRINT_TYPES_SUCCESS(state, printTypes) {
        state.printTypes = printTypes;
    },
}

const actions = {
    fetchFonts({commit}) {
        return SystemService.fetchFonts()
            .then(({data}) => {
                commit('SET_FETCH_FONTS_SUCCESS', data.data)
                return Promise.resolve(data.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    fetchFontColors({commit}) {
        return SystemService.fetchFontColors()
            .then(({data}) => {
                commit('SET_FETCH_FONT_COLORS_SUCCESS', data.data)
                return Promise.resolve(data.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    fetchDesignBankLogos({commit}) {
        return SystemService.fetchDesignBankLogos()
            .then(({data}) => {
                commit('SET_FETCH_DESIGN_BANK_LOGOS_SUCCESS', data.data)
                return Promise.resolve(data.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    fetchPrintTypes({commit}) {
        return SystemService.fetchPrintTypes()
            .then(({data}) => {
                commit('SET_FETCH_PRINT_TYPES_SUCCESS', data)
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    fetchColors() {
        return SystemService.fetchColors()
            .then(({data}) => {
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },

    fetchLookAndFeels() {
        return SystemService.fetchLookAndFeels()
            .then(({data}) => {
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}