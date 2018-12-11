<template>
    <div class="footerbtn"  style="-webkit-app-region: no-drag;">
        <div class="btnGroups">
            <div class="group">
                <div class="item pointer" @click="routeOrderRelease(1)">
                    <span>找人</span>
                </div>
                <div class="item item-center pointer" :class="status == '1' ? 'c_m' : ''" @click="setMode">
                    <span>{{status == 1 ? '接单中': '休息中'}}</span>
                </div>
                <div class="item pointer" @click="routeOrderRelease(3)">
                    <span>找物</span>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import eventBus from '../api/eventBus'
import play from '../api/audioplay'
import { audio } from '../api/config'
import { X_setStatus, X_currentstatus } from '../api/xhr'
export default {
    data() {
      return {
        status: '1'
      }
    },

    computed: {

    },

    created(){
      const that = this
        X_currentstatus({}).then(res =>{
          if(res.data.code == 10000){
            that.status = res.data.data.status

          }
        })
    },

    mounted(){
        
    },

    methods: {
       setMode(){
           let status = null
           if(this.status == '1'){
               this.status = '0'
               status = 0
               play(audio.restMode)
           }else{
               this.status = '1'
               status = 1
               play(audio.orderMode)
           }
           X_setStatus({status: status}).then(res =>{})
        },

        routeOrderRelease(id){
            this.$store.commit('IS_REEDIT', false)
            this.$store.commit('WIPE_PARAMS')
            this.$store.commit('SET_ORDER_TYPE', id)
            this.$store.dispatch('get_second_level', id)
            this.$router.push({path: '/index/release'})
        }
    },
}
</script>

<style>
.footerbtn{
  width: 100%;
  height: 48px;
  background: #FFFFFF;
  border-top: 1px solid #EAE9E9;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  position: relative;
}
.btnGroups{
   position: absolute;
   top: 3px;
   left: 50%;
   transform: translateX(-50%);
   z-index: 100;
   /* border: 1px solid #ff7e22; */
   border-radius: 14px;
   font-size: 13px;
    /* background: #FFFFFF; */
}
.group{
    width: 154px;
    height: 26px;
    border-radius: 13px;
    border: 1px solid #ff7e22;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.btnGroups .item{
    width: 50px;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    color: #ff7e22
}
.btnGroups .item.item-center{
    width: 54px;
    height: 54px;
    color: #FFFFFF;
    border-radius: 50%;
    background: #ff7e22;
    line-height: 54px;
}
</style>

