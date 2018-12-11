import router from '../../router/index'
import { handlesuccess } from '../../api/toast'
import { 
    GET_ALL_ORDER, 
    SWITCH_TYPE, 
    SWITCH_STATUS,
    GET_DETAILS, 
    GET_SECOND_LEVEL, 
    GET_SECOND_ID, 
    GET_THIRD_LEVEL, 
    GET_INSURE_INFO,
    GET_NAVTITLE,
    SET_ORDER_TYPE,
    SELECT_WORK_TYPE, 
    SELECT_ADDRESS, 
    SELECT_OTHER_INFO, 
    SELECT_INSURE,
    GET_TIME,
    WIPE_PARAMS,
    SELECT_CLASS,
    REMOVE_CLASS,
    CHANGE_GOODS_NUM,
    PAY_SUCCESS,
    HIDE_PAY_DIALOG,
    CLONE_BUNDLE,
    IS_REEDIT,
    SET_LOADING_STATE
} from '../type'
import { 
    X_nearOrder, 
    X_releasedOrder, 
    X_receivedOrder, 
    X_orderInfo, 
    X_secondLevel, 
    X_thirdLevel, 
    X_orderConfigInfo 
} from '../../api/xhr'


const state = {
    orders: [],
    details: {},
    navtitle: '',
    ordertype: 1,
    stairMenus: [],
    secondMenus: [],
    bundle: {}, 
    task: [],
    insureInfo: {},
    qrCode: null,
    type: 0,
    status: 0,
    isNoData: false,
    total: null,
    isReEdit: false,
    loadAll: false,
    isLoading: false
}

const mutations = {
    [SET_LOADING_STATE](state){
        state.loadAll = false
        state.isLoading = true
    },

    [GET_ALL_ORDER](state, res){
        

        if(res.page > 1) state.orders = state.orders.concat(res.list) 
        if(res.page <= 1) state.orders = res.list

        state.total = res.total
        state.isLoading = false

        if(res.list.length < 20)state.loadAll = true
        if(res.list.length >= 20)state.loadAll = false
        
        if(state.orders.length <= 0){
            state.loadAll = false
            state.isNoData = true
        }
        if(state.orders.length > 0)state.isNoData = false
    },

    [SWITCH_TYPE](state, type){
        state.type = type
    },

    [SWITCH_STATUS](state, status){
        state.status = status
    },

    [GET_DETAILS](state, res){
        state.details = res
    },

    [SET_ORDER_TYPE](state, res){
        state.ordertype = res
    },

    [GET_SECOND_LEVEL](state, res){
        state.stairMenus = res
    },

    [GET_SECOND_ID](state, res){
        state.levelMenus['tid'] = res.id
        state.bundle['workTypeCatg'] = res.title   
    },

    [IS_REEDIT](state, res){
        state.isReEdit = res
    },

    [GET_THIRD_LEVEL](state, res){
        state.secondMenus = res
    },

    [GET_INSURE_INFO](state, res){
        state.insureInfo = res
        state.bundle['isBuyIns'] = '1'
        state.bundle['insurance'] = res.insuScheme[0].ins_price
        state.bundle['solutionCode'] = res.insuScheme[0].code
        state.bundle['favourableRatio'] = res.favourableRatio
    },

    [GET_NAVTITLE](state, res){
        state.navtitle = res
    },

    [GET_TIME](state, res){
        if(res.id == 1){
            state.bundle['startTime'] = res.time
        }else{
            state.bundle['startTime'] = res.time[0]
            state.bundle['endTime'] = res.time[1]
        }
    },

    [SELECT_WORK_TYPE](state, res){
        state.bundle['workType'] = res.title
        state.bundle['careerCode'] = res.career_code
        state.bundle['workTypeCatg'] = res.workTypeCatg
        state.bundle['workTypeId'] = res.id
        state.bundle['highEnable'] = res.high 
    },

    [SELECT_INSURE](state, res){
        if(res.isBuyIns == '1'){
            Object.keys(res).forEach(k => {
               state.bundle[k] = res[k]
            })
        }else{
            state.bundle['isBuyIns'] = '0'
            state.bundle['insurance'] = ''
            state.bundle['solutionCode'] = ''
        }
    },

    [SELECT_ADDRESS](state, res){
        Object.keys(res).forEach(k => {
            state.bundle[k] = res[k]
        })
    },

    [SELECT_OTHER_INFO](state, res){
        Object.keys(res).forEach(k => {
           state.bundle[k] = res[k]
        })
    },

    [SELECT_CLASS](state, res){
        if(res.repeat){
            state.secondMenus[res.index].grandson[res.idx].type = null   
            state.task.forEach((item, index) => {
              if(item.tid == res.data.id){
                   state.task.splice(index, 1)
               }
            })
        }else{
            state.secondMenus[res.index].grandson[res.idx].type = 1
            let repeat = false
            state.task.forEach((item) => {
               if(item.tid == res.data.id){
                   item.amount ++
                   repeat = true
               }
            })
            if(!repeat){
                state.task.push({
                    tid: res.data.id,
                    tname: res.data.title,
                    amount: 1
                })
            }
        }  
    },

    [REMOVE_CLASS](state){
        state.secondMenus.forEach((item) => {
           item.grandson.forEach((val) => {
              val.type = null
           })
        })
    },

    [CHANGE_GOODS_NUM](state, res){
      switch(res.type){
        case 'add':
           state.task[res.index].amount++
           break;
        case 'minus':
           state.task[res.index].amount--
           if(state.task[res.index].amount <= 0){
               state.task.splice(res.index, 1) 
           };
           break;
        case 'change':
           state.task[res.index].amount = res.num
           break;
        case 'delete':
           state.task.splice(res.index, 1)
           break;
      }
    },

    [PAY_SUCCESS](state, code=null){
        if(code == null){
            state.qrCode = null
            handlesuccess('订单发布成功')
        }else{
           state.qrCode = code 
        }
    },

    [HIDE_PAY_DIALOG](state){
        state.qrCode = null
    },

    [WIPE_PARAMS](state){
        state.task = []
        state.bundle = {}
    }
}

const actions = {
    async get_all_order({ commit, state }, page=1){
        let list = null
        let total = null
        if(state.type == 0){
           list = await X_nearOrder({page: page})
        }
        if(state.type == 1){
           list = await X_releasedOrder({page: page, type: state.status})
        }
        if(state.type == 2){
           list = await X_receivedOrder({page: page, type: state.status})
        }
        total = list.data.data.total 
        list = list.data.data.list
        

        commit('GET_ALL_ORDER', {page: page, list: list, total: total})
    },

    async get_second_level({ dispatch, commit }, tid){
        await X_secondLevel({tid: tid}).then((res) => {
            let result = res.data.data.info.child
            commit('GET_SECOND_LEVEL', result)
            dispatch('get_third_level', result[0].id)
        })
    },

    async get_third_level({ commit }, tid){
        await X_thirdLevel({tid: tid}).then((res) => {
            let result = res.data.data.info.children
            if(tid == 3){
                result.forEach((item, index) => {
                   if(!item.grandson){
                      result.splice(index, 1)
                   }
                })
            }
            
            commit('GET_THIRD_LEVEL', result)
        })
    },

    get_others_info({ commit }, res){
        commit('SELECT_OTHER_INFO', res)
    },

    async get_insure_info({ commit }, res){
        await X_orderConfigInfo({type: res.type, high: res.high}).then((res) => {

            commit('GET_INSURE_INFO', res.data.data)
        })
    },

    async get_details({ commit }, payload){
        await X_orderInfo({oid: payload.id}).then((res) =>{
            let result = res.data.data
            commit('GET_DETAILS', result)
            if(payload.route){
                if(typeof payload.route == 'string'){
                    router.push({path: payload.route})
                    return
                }
                commit('GET_ALREADY_PUSH', result.alreadyPush)
                router.push({path: '/index/detail'})
            }
        }).catch((error) =>{

        })     
    }
}

const getters = {
    orders: state => {
        return state.orders
    },

    navtitle: state => {
        return state.navtitle
    },
    
    details: state => {
        // state.details.userInfo.userphoto
        return state.details
    },

    stairMenus: state => {
        return state.stairMenus
    },

    secondMenus: state => {
        return state.secondMenus
    },

    bundle: state => {
        return state.bundle
    },

    task: state => {
        return state.task
    },

    qrCode: state => {
        return state.qrCode
    },

    type: state => {
        return state.type
    },

    status: state => {
        return state.status
    },

    isNoData: state => {
        return state.isNoData
    },

    loadAll: state => {
        return state.loadAll
    },

    total: state => {
        return state.total
    },

    isReEdit: state=> {
        return state.isReEdit
    },

    isLoading: state=> {
        return state.isLoading
    }
}

export default {
    state,
    actions,
    mutations,
    getters,
    
}