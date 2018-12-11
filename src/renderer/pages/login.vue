<template>
  <div class="login" style="-webkit-app-region: drag;">
     <!-- style="-webkit-app-region: drag;" -->
    <div class="login-bar flex-between flex-alc">
        <div class="login-bar-tle" style="-webkit-app-region: no-drag;">
            <img src="../assets/images/loogo@2x.png" alt="">
        </div>
        <div class="login-bar-icon pointer"  @click="closelogin" style="-webkit-app-region: no-drag;">
            <i class="iconfont icon-guanbi2 icon-white"></i>
        </div>
    </div>
    <div class="box" style="-webkit-app-region: drag;">
        <div class="user-img" style="-webkit-app-region: no-drag;">
            <img style="-webkit-app-region: no-drag;" :src="userphoto" alt="">
        </div>
        <div class="form-wrap" style="-webkit-app-region: no-drag;">
            <div class="form-item flex-alc">
                <div class="phone-sel-box flex-alc">
                    <span class="f_w c_t">+86</span>
                    <i class="iconfont icon-xiala icon-black pointer"></i>
                </div>
                <input :class="{errornotice: errorPhone}" type="number" @focus="getFocus" v-model="phone" :placeholder="placeholder"  />
            </div>
            <div class="form-item code-item">
                <input class="code-input" type="number" v-model="authcode"  @focus="InputCode" placeholder="输入验证码"/>
                <i v-if="!isdisabled" class="iconfont icon-youjiantou icon-grey pointer" @click="commit"></i>
            </div>
        </div>
        <div class="getcode-box" v-if="disabled" style="-webkit-app-region: no-drag;">
            <span class="f_w" :class="{pointer: disabled}" @click="getAuthCode">{{codeText}}<b> {{count}}</b> </span>
        </div>

    </div>
  </div>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
import '../assets/css/font.css'
import { X_getAuthCode, X_login } from './../api/xhr'
import { trim } from '../api/filter'
export default {
  name: 'login',
  data () {
    return {
      phone: null,
      authcode: null,
      disabled: true,
      isdisabled: true,
      count: null,
      interval: null,
      codeText: '获取验证码',
      errorPhone: false,
      placeholder: '请输入手机号',
      userphoto: '../assets/images/ggxlogo.png'
    }
  },

  created(){
    if(localStorage.getItem('userPhoto')) this.userphoto = localStorage.getItem('userPhoto')
  },

  watch: {
    authcode(newVal, oldVal){
        const that = this
        that.isdisabled = true
        if(newVal!=null) that.isdisabled = false
    }
  },

  methods: {
    getFocus(){
        this.phone = null
        this.errorPhone = false
        this.placeholder = '请输入手机号'
    },

    InputCode(){
        if(this.authcode!=null)this.disabled = false 
        
    },

    getAuthCode(){
        if(this.phone==null) {
            this.errorPhone = true
            this.placeholder = '手机号不能为空'
            return
        }
        const that = this
        const params = {
            phone: this.phone,
            type: '0'
        }
        this.count = 60
        // this.disabled = false 
        this.codeText = '已发送至手机'
        this.interval = setInterval(() => {
            that.count--
            if(that.count <= 0) {    
                clearInterval(that.interval)
                that.count = null
                that.disabled = true
                that.codeText = '重新发送'
            }
        }, 1000)
        X_getAuthCode(params).then(res =>{
            console.log(res)
            if(res.data.code != 10000) {
                console.log('信息发送失败')
                clearInterval(that.interval)
                that.interval = null
                that.count = null
                that.disabled = true
                that.codeText = '重新发送'
                return
            }

        })

    },

    closelogin(){
      clearInterval(this.interval)
      this.interval = null
      ipc.send('closelogin');
    },

    commit(){
        const that = this
        clearInterval(this.interval)
        this.interval = null
        const params = {
            phone: this.phone,
            vcode: this.authcode,
            isMiniapp: '1'
        }

        X_login(params).then(res =>{
            if(res.data.code == 10000){
                localStorage.setItem('uid', res.data.data.uid)
                localStorage.setItem('token', res.data.data.token)
                that.$store.dispatch('get_user_info')
                ipc.send('closelogin');
            }
        })
    },
  }
}
</script>


<style scoped>
.login{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #FFFFFF;
}
.login .login-bar{
    padding: 0 25px;
    height: 40px;
    background: #ff7e22;
    color: #FFFFFF;
}
.login .login-bar .login-bar-tle img{
    width: 36px;
    height: 12px;
    display: block;
}
.login .login-bar .login-bar-icon{
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: right;
    opacity: 0.8
}
.login .login-bar .login-bar-icon .iconfont{
    font-size: 12px;
    color: #FFFFFF;
}
.login .login-bar .login-bar-icon:hover{
    opacity: 1
}

.login .box .user-img img{
    width: 99px;height: 99px;display: block;margin: 50px auto;border-radius: 50%;
}
.login .box .form-wrap{
    padding: 0 45px;
}
.login .box .form-wrap .form-item{
    margin: 0 auto;
    height: 42px;
    border-bottom: 2px solid #DCDCDC
}
.login .box .form-wrap .form-item input{
    display: block;
    height: 40px;
    line-height: 40px;
    border: none;
    outline: none;
    width: 150px;
    padding-left: 12px;
    font-size: 14px;
    font-weight: bold;
}
.login .box .form-wrap .form-item input.errornotice{
    color: red;
}
.login .box .form-wrap .form-item .phone-sel-box{
    width: 64px;
    height: 18px;
    font-size: 13px;
    padding-right: 15px;
    border-right: 2px solid #DCDCDC;
}
.login .box .form-wrap .form-item .phone-sel-box i{
    font-size: 9px;
    padding-left: 10px;
}
.login .box .form-wrap .form-item input::-webkit-input-placeholder {
    color: #A7A6AA; 
}
.login .box .form-wrap .form-item input.errornotice::-webkit-input-placeholder {
    color: red; 
}
.login .box .form-wrap .form-item.code-item{
    position: relative;
}
.login .box .form-wrap .form-item.code-item .iconfont{
    position: absolute;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold;
    font-size: 24px;
}
.login .box .getcode-box{
    padding: 0 45px;
    margin-top: 36px;
    text-align: right;
    color: #aaaaaa;
    font-size: 13px;
}
.login .box .getcode-box span{
    display: block;
}
.login .box .getcode-box .pointer{
    color: #87888D;
    cursor: pointer
}
</style>
