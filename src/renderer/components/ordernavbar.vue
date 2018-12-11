<template>
    <div class="navbar f_l">
        <div class="parent-nav" :class="type == 0 ? 'active' : ''">
            <div class="nav-item flex-alc pointer" @click="switchId(0)">
                <div class="icons-bg b_m">
                    <i class="iconfont icon-muluxiangmu icon-white"></i>
                </div>
                <span>周边订单</span>
            </div>
        </div>
        <div class="parent-nav" :class="type == 1 ? 'active' : ''">
            <div class="nav-item  flex-alc pointer" @click="switchId(1)">
                <div class="icons-bg b_m">
                    <i class="iconfont icon-muluxiangmu icon-white"></i>
                </div>
                <span>我发的单</span>
            </div>
            <div class="child-nav" v-if="type == 1">
                <div class="nav-item">
                    <span class="pointer" :class="status == 0 ? 'active' : ''" @click="switchIndex(0)">全部</span>
                </div>
                <div class="nav-item">
                    <span class="pointer" :class="status == 1 ? 'active' : ''" @click="switchIndex(1)">待抢单</span>
                </div>
                <div class="nav-item">
                    <span class="pointer" :class="status == 2 ? 'active' : ''" @click="switchIndex(2)">已抢单</span>
                </div>
                <div class="nav-item">
                    <span class="pointer" :class="status == 3 ? 'active' : ''" @click="switchIndex(3)">已结束</span>
                </div>
            </div>
        </div>
        <div class="parent-nav" :class="type == 2 ? 'active' : ''">
            <div class="nav-item  flex-alc pointer" @click="switchId(2)">
                <div class="icons-bg b_m">
                    <i class="iconfont icon-muluxiangmu icon-white"></i>
                </div>
                <span>我接的单</span>
            </div>
            <div class="child-nav" v-if="type == 2">
                <div class="nav-item">
                    <span class="pointer" :class="status == 0 ? 'active' : ''" @click="switchIndex(0)">全部</span>
                </div>
                <div class="nav-item">
                    <span class="pointer" :class="status == 1 ? 'active' : ''" @click="switchIndex(1)">未开始</span>
                </div>
                <div class="nav-item">
                    <span class="pointer" :class="status == 2 ? 'active' : ''" @click="switchIndex(2)">已开始</span>
                </div>
                <div class="nav-item">
                    <span class="pointer" :class="status == 3 ? 'active' : ''" @click="switchIndex(3)">已结束</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import eventBus from '../api/eventBus'
// import { X_gettoken } from '../api/xhr'
export default {
  data () {
    return {
    }
  },

  computed: {
    ...mapGetters(['type', 'status'])
  },

  created(){
   
  },

  methods: {
    switchId(id){
        $('.navbar').siblings('#wrap').animate({scrollTop: '0px'}, 300)
        this.$store.commit('SET_LOADING_STATE')
        this.$store.commit('SWITCH_TYPE', id)
        this.$store.commit('SWITCH_STATUS', 0)
        this.$store.dispatch('get_all_order')
    },

    switchIndex(index){
        // console.log(index)
        // this.navIndex = index
        // this.$emit('switchIndex', index)
        $('.navbar').siblings('#wrap').animate({scrollTop: '0px'}, 300)
        this.$store.commit('SET_LOADING_STATE')
        this.$store.commit('SWITCH_STATUS', index)
        this.$store.dispatch('get_all_order')
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
.parent-nav .nav-item{
    height: 54px;
    line-height: 54px;
    padding-left: 15px;
}
.parent-nav .nav-item span{
    margin-left: 7px;
}
.parent-nav .nav-item .icons-bg{
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
}

.parent-nav .child-nav{
    width: 100%;
    text-align: center;
    padding: 8px 0 15px 10px;
}

.parent-nav .child-nav .nav-item{
    padding: 0;
    height: 24px;
    line-height: 24px;
    border-bottom: 1px solid #E9E9E9
}

.parent-nav .child-nav .nav-item span.active{
    color: #ff7e22
}



</style>
