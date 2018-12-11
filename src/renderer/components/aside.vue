<template>
  <div class="asides" style="-webkit-app-region: drag;">
      <div class="tabs" style="-webkit-app-region: no-drag;">
          <router-link class="tab-item" to="/index/home">
              <i class="iconfont icon-shouye icon-white" @mouseenter="enter('index')" @mouseleave="leave()"></i>
              <span v-if="current == 'index'" class="tooltip f_i">首页</span>
          </router-link>
          <router-link class="tab-item" to="/index/messages">
              <i class="iconfont icon-xiaoxi icon-white" @mouseenter="enter('message')" @mouseleave="leave()"></i>
              <span v-if="current == 'message'" class="tooltip f_i">消息</span>
          </router-link>  
          <router-link class="tab-item" to="/index/orders">
              <i class="iconfont icon-muluxiangmu icon-white" @mouseenter="enter('order')" @mouseleave="leave()"></i>
              <span v-if="current == 'order'" class="tooltip f_i">订单</span>
          </router-link>
          <router-link class="tab-item" to="/index/close">
              <i class="iconfont icon-pengyou icon-white" @mouseenter="enter('friends')" @mouseleave="leave()"></i>
              <span v-if="current == 'friends'" class="tooltip f_i">好友</span>
          </router-link>
          <router-link class="tab-item" to="/index/close">
              <i class="iconfont icon-shangcheng icon-white" @mouseenter="enter('store')" @mouseleave="leave()"></i>
              <span v-if="current == 'store'" class="tooltip f_i">商城</span>
          </router-link>
          <router-link class="tab-item" to="/index/close">
              <i class="iconfont icon-shouye icon-white" @mouseenter="enter('index')" @mouseleave="leave()"></i>
              <span v-if="current == 'index'" class="tooltip f_i">首页</span>
          </router-link>
      </div>
      <div class="logout clickable pointer" @click="alert" style="-webkit-app-region: no-drag;">
          <i class="iconfont icon-caidan icon-white"  @mouseenter="enter('more')" @mouseleave="leave()"></i>
          <span v-if="current == 'more'" class="tooltip f_i">更多</span>
      </div>
      
  </div>
</template>

<script>
import '../assets/css/font.css'
import { mapGetters } from 'vuex'
import { default as swal } from 'sweetalert2'
import { handlesuccess } from '../api/toast'
import Dialog from '../dialog/dialog'
const {ipcRenderer: ipc} = require('electron');
export default {
  data () {
    return {
      current: null
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'starArr'])
  },

  watch: {
      $route(to,from){
        console.log(to.path.substring(7));
      }
  },

  created(){
    
  },

  mounted(){
  },

  methods: {
    alert(){
        // handlesuccess('订单发布成功')
        // const ggxDg = new Dialog()
        new Dialog().init({
          showbtn: false,
          title: '订单取消成功！',
          // text: '确定取消订单吗？',
          icon: 'info',
          hide: ()=>{
            console.log('小时')
          }
          // cancel: () =>{console.log('cancel')},
          // confirm: () =>{console.log('confirm')}
        })
    },

    enter(hover){
      this.current = hover
    },

    leave(){
      this.current = null
    }
  }
}
</script>

<style scoped>
.asides{
    text-align: center;
    width: 54px;
    height: 100%;
    /* min-height: 400px; */
    position: relative;
    padding-top: 50px;
}
.asides .tabs{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.asides .tabs .tab-item{
    margin: 10px 0;
    position: relative;
}
.asides .tabs .tab-item .iconfont{
  font-size: 18px;
}
.asides .tabs .tab-item.active .iconfont{
    color: #FF7E22;
}
.asides .tabs .tab-item span,
.asides .logout span{
  position: absolute;
  display: block;
  padding: 4px;
  background: #555B6D;
  color: #FEFEFE;
  left: 42px;
  top: 50%;
  white-space: nowrap;
  z-index: 100;
  border-radius: 3px;
  transform: translateY(-50%);
}
.asides .logout{
    padding: 5px 0;
    width: 100%;
    position: absolute;
    bottom: 55px
}
</style>
