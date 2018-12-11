import axios from 'axios'
import { api, resCode, ROOT_URL } from './config'
import Dialog from '../dialog/dialog'
import { Loading } from 'element-ui'
const {ipcRenderer: ipc} = require('electron');


let httpList = [];

const service = axios.create();
const CancelToken = axios.CancelToken;
service.defaults.baseURL = ROOT_URL;
service.defaults.timeout = 1500;
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
service.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
export default {
    POST(url, params = {}, token = 1) {
        if(!navigator.onLine){
            handlefail('错误提示！', '正在查询原因...', '/index/nonetwork')
            return
        }
        if(token == 1){
            let uid = localStorage.getItem('uid')
            let token = localStorage.getItem('token')
            if(!uid||uid==null||uid==undefined||!token||token==null||token==undefined){
                ipc.send('openlogin', window.location.origin+'/#/login');
                // handlefail('提示！', '您未登录，即将为您跳转')
                return
            }
            params['uid'] = uid
            params['token'] = token
                
        }
        // let loadingInstance = Loading.service({ fullscreen: true })
        return new Promise((resolve) => {  
            service.post(url, params, {
                CancelToken: new CancelToken(function executor(c) {
                    httpList.push(c)
                })
            }).then(res => {
                // loadingInstance.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                //     loadingInstance.close();
                // });
                if(res.data.code == resCode.success)resolve(res)
                if(res.data.code == resCode.failure){
                    resolve(res)
                    // handlenotice('提示！', res.data.message)
                }
                if(res.data.code == resCode.inexistence)ipc.send('openlogin', window.location.origin+'/#/login');
                if(res.data.code == resCode.tokenerr)ipc.send('openlogin', window.location.origin+'/#/login');
            }).catch(error => {
                // loadingInstance.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                //     loadingInstance.close();
                // });
                console.log(error)
                // switch(error.response.status){
                //     case 404:
                //         handlefail('提示！', '未找到服务器地址资源', '/index/404');
                //         break;
                //     case 500:
                //         handlefail('提示！', '请求数据资源出现错误', '/index/500');
                //         break;
                //     case 503:
                //         handlefail('提示！', '服务器超负荷，维护中', '/index/503');
                //         break;
                // }
            })
        })
    },
    CLEARPOST(){
        if(httpList.length > 0){
            httpList.forEach((item) => {
              item()
            })
            httpList = []
        }
    }
}

