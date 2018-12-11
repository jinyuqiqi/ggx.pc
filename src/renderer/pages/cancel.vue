<template>
  <div class="wrap">
      <!-- <v-nav-title :navtitle="mytitle"></v-nav-title> -->
      <div class="block">
          <div class="c_a">请选择取消订单原因:</div>
          <div class="flex-alc pointer" v-for="(item, index) in reasonList" :key="index" @click="selectreason(index)">
            <b :class="acIndex == index ? 'b_m' : ''"></b><span>{{item}}</span>
          </div>
      </div>
      <p class="c_m f_s">注： 根据系统判定，您此次的申请取消操作需向对方支付20广告币作为赔偿</p>
      <div class="btn-for b_m pointer" @click="commit">提交</div>
  </div>
</template>

<script>
import { resCode } from '../api/config'
import { handlenotice, handlemodal, handlesuccess } from '../api/toast'
import { X_cancelReason, X_orderApplyCancel } from '../api/xhr'
import NavTitle from '../components/secondpagenav.vue'
export default {
  data () {
    return {
      mytitle: '申请取消',
      reasonList: [],
      acIndex: -1,
    }
  },

  computed: {

  },

  methods: {
     selectreason(index){
        this.acIndex = index
     },

     commit(){
        if(this.acIndex < 0) {
          handlenotice('请选择取消原因')
          return
        }
        
        handlemodal('确定取消订单？', '', this.cancel)
     },

     cancel(){
        const that = this
        const params = {
          oid: this.$store.state.order.details.orderInfo.oid,
          reason: this.reasonList[this.acIndex]
        }
        X_orderApplyCancel(params).then(res => {
          if(res.data.code == resCode.success){
                handlesuccess('订单取消成功')
                that.$store.dispatch('get_details', {id: params.oid, route: true})
          }
        })
     },
  },

  

  created(){
    X_cancelReason({}).then(res => {
      this.reasonList = res.data.data.list
    })
  },

  mounted(){

  },

  components: {
    'v-nav-title': NavTitle
  }
}
</script>

<style scoped>
.block .c_a{
  line-height: 28px;
}
.block .flex-alc{
  height: 36px;
  line-height: 36px;
  justify-content: flex-start;
  margin-left: 140px;
  white-space: nowrap;
}
.block .flex-alc:hover{
  color: #333333
}
.block .flex-alc b{
  display: block;
  width: 14px;
  height: 14px;
  border: 1px solid #666666;
  border-radius: 50%;
  margin-right: 8px;
}
.block .flex-alc b.b_m{
  border-color: #ff7e22
}
.wrap p{
  line-height: 18px;
  margin-top: 15px;
}
.wrap .btn-for{
    width: 108px;
    line-height: 42px;
    text-align: center;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 0 0 0 10px;
    letter-spacing: 10px;
    box-sizing: border-box;
    margin: 50px auto 0;
}
</style>
