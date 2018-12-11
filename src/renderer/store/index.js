import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import login from './modules/login'
import order from './modules/order'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    
    modules: {
        login,
        home,
        order
    }
})