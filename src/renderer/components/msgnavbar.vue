<template>
    <div class="navbar f_l">
        <div :class="[msg == 0 ? 'active' : '', 'parent-nav']">
            <div class="nav-item flex-alc pointer" @click="switchMsg(0)">
                <div class="icons-bg b_m">
                    <i class="iconfont icon-gonggao"></i>
                </div>
                <span class="f_w c_t">系统提示</span>
            </div>
        </div>
        <div :class="[msg == 1 ? 'active' : '', 'parent-nav']">
            <div class="nav-item  flex-alc pointer" @click="switchMsg(1)">
                <div class="icons-bg b_m">
                    <i class="iconfont icon-shouye1"></i>
                </div>
                <span class="f_w c_t">活动公告</span>
            </div>
        </div>
        <div class="concatbox">
            <div class="nav-item flex-alc concat-item pointer active" @click="switchMsg(2)">
                <div class="icons-bg b_m">
                    <i class="iconfont icon-gonggao"></i>
                </div>
                <span>系统提示</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '../api/eventBus'
import  { X_messageList, X_activityList } from '../api/xhr'

export default {
  data () {
    return {
        msg: 0,
    }
  },

  computed: {
   
  },

  created(){
    this.switchMsg(this.msg)
  },

  mounted(){

  },

  methods: {
    switchMsg(msg){
        const that = this
        that.msg = msg
        eventBus.$emit('getMsglist', msg)
    }
  }
}
</script>

<style scoped>
.navbar{
    width: 150px;
    max-width: 150px;
    background: #FFFFFF;
    border-right: 1px solid #E9E9E9
}
.parent-nav{
    width: 100%;
}
.parent-nav.active{
    /* font-weight: bold; */
    background: #F0F0F0;
    border-bottom: 1px solid #E9E9E9
}
.parent-nav.active .nav-item{
    border-bottom: 1px solid #E9E9E9

}
.nav-item{
    height: 54px;
    line-height: 54px;
    padding-left: 15px;
}
.nav-item span{
    margin-left: 7px;
}
.nav-item .icons-bg{
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
}
.nav-item .icons-bg .iconfont{
    color: #FFFFFF;
    font-size: 16px;
}
.concat-item{
    height: 48px;
    line-height: 48px;
    padding-left: 18px;
}
.concat-item .icons-bg{
    width: 26px;
    height: 26px;
    line-height: 26px;
}
.concat-item.active{
    background: #F0F0F0;
}
.concatbox{
    margin-top: 8px;
    padding-top: 6px;
    border-top: 1px solid #D4CFCF
}

</style>
