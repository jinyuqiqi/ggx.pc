import { X_userInfo } from '../../api/xhr'
import { GET_USER_INFO, SHOW_DIALOG, HIDE_DIALOG, GET_ALREADY_PUSH, IS_LOGIN } from '../type.js'

const state = {
    userInfo: {},
    show: false,
    alreadyPush: 0,
    dialog: null,
    isLogin: false
}

const mutations = {
    [GET_USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    },

    [SHOW_DIALOG](state, res) {
        state.show = true
        state.dialog = res
    },

    [IS_LOGIN](state, res) {
        state.isLogin = res
    },

    [HIDE_DIALOG](state) {
        state.show = false
    },

    [GET_ALREADY_PUSH](state, res) {
        state.alreadyPush = res
    }
}

const actions = {
    async get_user_info({ commit }) {
        let uid = localStorage.getItem('uid')
        if (!uid) {
            commit('IS_LOGIN', false)
            return
        }
        await X_userInfo({}).then((res) => {
            const userInfo = res.data.data
            localStorage.setItem('userPhoto', userInfo.userphoto)
            commit('IS_LOGIN', true)
            commit('GET_USER_INFO', userInfo)
        })
    }
}

const getters = {
    userInfo: state => {
        return state.userInfo
    },

    show: state => {
        return state.show
    },

    dialog: state => {
        return state.dialog
    },

    alreadyPush: state => {
        return state.alreadyPush
    },

    isLogin: state => {
        return state.isLogin
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}