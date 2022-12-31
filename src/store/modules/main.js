const namespaced = true

const defaultState = () => {
    return {
        snackbar: {
            success: false,
            fail: false,
            message: ""
        },
        loading: false,
        drawer: false,
    }
}

const state = defaultState()
const mutations = {
    setSnackbarSuccess: (state, payload) => {
        state.snackbar.success = !state.snackbar.success
        state.snackbar.message = payload
    },
    setSnackbarFail: (state, payload) => {
        state.snackbar.fail = !state.snackbar.fail
        state.snackbar.message = payload
    },
    setLoading: (state) => {
        state.loading = !state.loading
    },
    setDrawer: (state) => {
        state.drawer = !state.drawer
    }
}

const actions = {}

export default {
    namespaced,
    state,
    mutations,
    actions
}