import {
    X_login
} from '../../api/xhr'
import {
    resCode
} from '../../api/config'
import {
    LOGIN,
    LOGOUT
} from '../type.js'
import router from '../../router/index'

const state = {
    uid: '',
    token: ''
}

const mutations = {
    [LOGIN](state, res) {
        state.uid = res.uid
        state.token = res.token
        localStorage.setItem('uid', res.uid)
        localStorage.setItem('token', res.token)
    },

    [LOGOUT](state) {
        state.uid = ''
        state.token = ''
    }
}

const actions = {
    async login({
        commit
    }, params) {
        const res = await X_login(params)
        if (res.data.code == resCode.success) {
            router.push({
                path: '/index'
            })
            commit('LOGIN', res.data.data)
        }
    }
}
export default {
    state,
    mutations,
    actions
}