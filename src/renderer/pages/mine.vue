<template>
  <div class="wrap">
      <div class="flex-alc xxx">
        <div @click="route('balance')" class="pointer">钱包余额{{userInfo.money}}</div>
        <div @click="route('ggxcoin')" class="pointer">广告币{{userInfo.virtualCoin}}</div>
        <div @click="route('mytags')" class="pointer">我的业务</div>
        <div @click="route('vip')" class="pointer">VIP</div>
        <div @click="route('friends')" class="pointer">我的好友</div>
        <div @click="route('security')" class="pointer">保障服务</div>
        <div @click="route('recognizee')" class="pointer">常用被保人</div>
        <div @click="route('enterprises')" class="pointer">企业入驻</div>
        <div @click="route('redpacket')" class="pointer">发个红包</div>
        <div @click="route('guide')" class="pointer">使用指南</div>
        <div @click="route('customer')" class="pointer">联系客服</div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    route(path){
      let pagepath = `/index/${path}`
      this.$router.push({path: pagepath})
    }
  },

  mounted(){
    
  },

  destroyed(){
    
  },

  components: {
    
  }
}
</script>

<style>
.wrap .xxx{
  flex-wrap: wrap;
}
.xxx div{
  min-width: 100px;
  line-height: 20px;
  padding: 5px 0;
  margin: 5px;
  text-align: center;
  background: #837582;
  color: #FFFFFF;
}
</style>
