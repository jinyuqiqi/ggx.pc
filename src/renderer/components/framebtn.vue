<template>
  <div class="frame-header flex-alc flex-between"  style="-webkit-app-region: no-drag;">
     <div class="searchbox flex-alc">
         <b class="f_m c_m">广告侠</b>
         <div class="input-wrap">
              <i class="iconfont icon-search icon-grey"></i>
              <input class="s-input" placeholder="搜索，订单联系人关键词等" type="text">
         </div>
     </div>
     <div class="ggx-tle c_m">广告人必备工具及业务倍增系统</div>
     <div class="settings flex-alc flex-end">
         <div class="userImg flex-alc" v-if="isLogin">
             <img class="pointer" @click="showUserCard('toggle')" :src="userInfo.userphoto" alt="">
             <i v-if="!isPullUp" class="iconfont icon-xiala icon-black pointer" @click="showUserCard('down')"></i>
             <i v-if="isPullUp" class="iconfont icon-shangla icon-black pointer" @click="showUserCard('up')"></i>
         </div>
         <div class="userImg flex-alc" v-if="!isLogin">
             <span class="pointer" @click="openlogin">登录</span>
         </div>
         
         <div class="system flex-alc flex-between">
             <i class="iconfont icon-zuixiaohua icon-deep" @click="eventWindow('min')"></i>
             <i v-if="!maxWin" class="iconfont icon-zuidahua icon-deep" @click="eventWindow('max')"></i>
             <i v-if="maxWin" class="iconfont icon-zuidahua1 icon-deep" @click="eventWindow('max')"></i>
             <i class="iconfont icon-guanbi2 icon-deep" @click="eventWindow('close')"></i>
         </div>
     </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '../api/eventBus'
const {ipcRenderer: ipc} = require('electron');
export default {
    data() {
      return {
         maxWin: false,
         isPullUp: false
      }
    },

    computed: {
        ...mapGetters(['userInfo', 'isLogin'])
    },

    created(){
        this.$store.dispatch('get_user_info')
    },

    mounted(){
        const that = this
        ipc.on('maxevent', (e, arg)=> {//监听窗口最大化切换右上角图标
            if(arg == 'max') that.maxWin = true
            if(arg == 'unmax') that.maxWin = false
        })
    },

    methods: {
       showUserCard(type){
          if(type == 'toggle') this.isPullUp = !this.isPullUp
          if(type == 'down') this.isPullUp = true
          if(type == 'up') this.isPullUp = false

          eventBus.$emit('listenShowHide', this.isPullUp)
       },

       eventWindow(window){
          ipc.send(window);
       },

       openlogin(){
          ipc.send('openlogin', window.location.origin+'/#/login');
       },
    },
}
</script>

<style>
.frame-header{
  width: 100%;
  min-width: 666px;
  height: 38px;
  line-height: 38px;
  background: #FFFFFF;
  border-bottom: 1px solid #EAE9E9;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.searchbox{
    width: 33.33%;
    padding-left: 16px;
    display: flex;
    flex-wrap: nowrap;
    min-width: 255px;
}
.searchbox .f_m{
    font-family: SimHei;font-weight: 900;font-size: 13px;
}
.searchbox .input-wrap{
    width: 179px;
    margin-left: 14px;
    position: relative;
}
.searchbox .input-wrap input.s-input{
    width: 100%;
    display: block;
    background: #F5F6F7;
    border: none;
    border-radius: 2px;
    padding: 6px 0 6px 20px;
    font-size: 10px;
}
.searchbox .input-wrap i{
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%)
}
.ggx-tle{
   width: 33.33%; 
   white-space: nowrap;
   text-align: center;
   font-size: 11px;
}
.settings{
    min-width: 160px;
    width: 33.33%;
}
.settings .userImg{
    height: 100%;
    padding-right: 20px;
    border-right: 1px solid #CFCBC7;
}
.settings .userImg img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 5px;
}
.settings .userImg img:hover{
    opacity: 0.8
}
.settings .userImg span{
  font-size: 12px;
  font-weight: bold;
  color: #999;
}
.settings .userImg span:hover{
  color: #333
}
.settings .userImg i{
    font-size: 8px;
}
.settings .userImg i:hover{
    color: #777;
}
.settings .system {
    padding: 0 5px;
    width: 95px;
}
.settings .system i{
    text-align: center;
    font-size: 12px;
    width: 33.33%;
    height: 20px;
    line-height: 20px;
}
.settings .system i:hover{
    background: #f1f1f1;
    color: #000;
}
</style>

