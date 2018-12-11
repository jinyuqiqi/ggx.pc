<template>
    <transition name="el-zoom-in-top">
      <div class="user-card" v-if="showUserCard">
         <div class="part top-part flex-alc flex-between">
             <div class="nickname">
                 <div class="c_t f_z nick-text">{{userInfo.nickname}}</div>
                 <div class="c_a pointer">添加技能...</div>
             </div>
             <div class="userimg">
                 <img :src="userInfo.userphoto" alt="">
             </div>
         </div>
         <div class="part center-part">
             <div class="pointer">系统设置</div>
             <div class="pointer">下载手机版</div>
         </div>
         <div class="part bottom-part">
             <div @click="logout" class="pointer">退出登录</div>
         </div>
      </div>
    </transition>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
import { mapGetters } from 'vuex'
import eventBus from '../api/eventBus'
export default {
    data() {
      return {
        showUserCard: false
      }
    },

    computed: {
        ...mapGetters(['userInfo'])
    },

    mounted(){
        this.listenShowHide()
    },

    created(){
    },

    methods: {
        listenShowHide(){
            const that = this
            eventBus.$on('listenShowHide', function(data){
                that.showUserCard = data
            })
        },

        logout(){
            this.$router.push({path: '/index'})
            localStorage.removeItem('uid')
            localStorage.removeItem('token')
            this.$store.commit('IS_LOGIN', false)
            this.showUserCard = false
        }
    },
}
</script>

<style>
.user-card{
  width: 200px;
  height: 210px;
  background: #FFFFFF;
  position: absolute;
  top: 38px;
  right: 60px;
  z-index: 100;
  box-shadow: -2px 2px 10px #E1E1E1
}
.user-card .part{
    padding: 0 15px;
}
.user-card .top-part{
    height: 85px;
    line-height: 22px;
}
.top-part .pointer:hover{
    color: #333;
}
.top-part .userimg img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.top-part .nick-text{
    width: 120px;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.user-card .center-part{
    height: 70px;
    padding: 6px 15px;
    line-height: 25px;
    border-top: 1px solid #DBDCDD;
    border-bottom: 1px solid #DBDCDD;
}
.center-part div{

}
.user-card .bottom-part{
    padding-top: 6px;
    height: 55px;
    line-height: 24px
}
.center-part .pointer:hover,
.bottom-part .pointer:hover{
    color: #000000;
}
</style>

