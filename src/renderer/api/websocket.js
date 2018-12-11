import store from '../store/index'
import play from './audioplay'
import { X_socket } from './xhr'
import { audio, SOCKET_URL } from './config'

const { ipcRenderer } = require('electron')

let linkstatus = false

function socket(){
    const uid = localStorage.getItem('uid')
    if(!uid||uid==null||uid==undefined) return
    if(websocket&&websocket.readyState == 1){
        websocket = null
        return
    } 
    let websocket = new WebSocket(SOCKET_URL);
    websocket.onopen = function onOpen() {
        console.log("websocket已连接到服务器");
    };

    websocket.onclose = function onClose() {
        console.log("websocket服务器连接断开,正在重新连接");
        websocket = null
        socket()
    };

    websocket.onerror = function onError() {
        console.log("websocket连接服务器失败，正在重新连接");
        websocket = null
        socket()
    }

    websocket.onmessage = function onMessage(evt) {
        let data = JSON.parse(evt.data);
        let ws = data.ws || '';
        if(ws == 'init'){
          X_socket({client_id: data.client_id})
        }else if(ws == 'ping'){
          websocket.send({  
             data: 'pong'
          })
        }else{
          if (data.type) {
            let type = data.type;
            if(type == 'ggx_sys_new_order'){
                play(audio.orderRemain) 
                store.commit('SHOW_DIALOG', data.order)
                ipcRenderer.send('message', '')
            }
            if(type == 'ggx_sys_order_info_refresh'){  
                store.dispatch('get_details', {id: data.oid, route: false})
                ipcRenderer.send('message', '')
            }
            if(type == 'ggx_sys_order_already_push'){
                store.commit('GET_ALREADY_PUSH', data.alreadyPush)
            }
            if(type == 'ggx_sys_order_payment_success'){
                store.commit('PAY_SUCCESS')
                store.dispatch('get_details', {id: data.oid, route: true})
            }
          }
        }
        
    };
}

export default socket


