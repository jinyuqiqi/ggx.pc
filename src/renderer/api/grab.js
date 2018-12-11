import router from '../router/index'
import store from '../store/index'
import { resCode } from './config'
import { X_grabOrder } from './xhr'
import { handlenotice } from './toast'

function grab(oid){
    console.log(oid)
    X_grabOrder({oid: oid}).then((res) =>{
        if(res.data.code == resCode.failure){
            handlenotice('提示！', '订单已被别人抢走')
        }
        store.dispatch('get_details', {id: oid, route: true})
    })
}


export default grab