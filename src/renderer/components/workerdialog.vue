<template>
  <div class="workdialog" v-if="workerInfo!=null">
      <div class="workdialog-mask"></div>
      <div class="workdialog-main">
          <div class="w-content" v-if="workerInfo.nickname">
              <div class="w-header send-one flex-center">
                <div class="info-photo">
                    <img :src="workerInfo.userphoto" />
                </div>
                <div class="info-credit f_s">
                    <div class="t_com f_m">{{workerInfo.nickname}}</div>
                    <div>信用度: {{workerInfo.credit}}分</div>
                    <div class="flex-alc">
                        <span>发单数: {{workerInfo.SendOrder}}</span>
                        <span class="icon-line"></span>
                        <span>接单数: {{workerInfo.alternative}}</span>
                    </div>
                </div>
              </div>
              <div class="w-body">
                <div class="flex-view c_t">
                    <span>年 龄:</span>
                    <span>{{workerInfo.age}}岁</span>
                </div>
                <div class="flex-view c_t">
                    <span>工 龄:</span>
                    <span>{{workerInfo.workAge}}年</span>
                </div>
                <div class="flex-view c_t">
                    <span>工 价:</span>
                    <span>¥{{workerInfo.averagePayment}}/天</span>
                </div>
                <div class="flex-view c_t">
                    <span>技 能:</span>
                    <span>{{workerInfo.majorBusiness==''?'未添加':workerInfo.majorBusiness}}</span>
                </div>
              </div>
              <div class="w-footer">
                  <h5 v-if="workerInfo.tags&&workerInfo.tags.length>0">获得的评价：</h5>
                  <div class="flex-alc f_i" v-if="workerInfo.tags.length>0">
                      <span v-for="item in workerInfo.tags">{{item}}</span>
                  </div>
                  <div class="w-btn b_m pointer" @click="routeOrderRelease(1)">平台发单 (免费)</div>
                  <div class="w-btn b_m pointer" @click="concat(workerInfo.uid)"><span class="f_z">¥2 </span>支付直接联系师傅</div>
              </div>
          </div>

          <div class="w-content" v-if="workerInfo.company">
              <div class="w-header send-one flex-center">
                <div class="info-photo">
                    <img :src="workerInfo.userphoto" />
                </div>
                <div class="info-credit f_s">
                    <div class="t_com f_m">{{workerInfo.company}}</div>
                    <div>信用度: {{workerInfo.credit}}分</div>
                    <div class="tips" v-if="workerInfo.attest=='0'">未认证</div>
                    <div class="tips" v-if="workerInfo.attest=='1'">企业认证</div>
                </div>
              </div>
              <div class="w-body">
                <div class="flex-view space-view c_t">
                    <span>主营业务:</span>
                    <span>{{workerInfo.business}}</span>
                </div>
                <div class="flex-view space-view c_t">
                    <span>公司介绍:</span>
                    <span>{{workerInfo.content == ''?'暂未编辑':workerInfo.content}}</span>
                </div>
                <div class="flex-view space-view c_t">
                    <span>公司地址:</span>
                    <span>{{workerInfo.locationdesc}}</span>
                </div>
                <div class="flex-view space-view c_t">
                    <span>公司电话:</span>
                    <span>{{workerInfo.tel}}</span>
                </div>
              </div>
          </div>

          <div class="w-close" @click="hideWorkerDialog">
              <img src="../assets/images/cha.png" alt="">
          </div>
      </div>
  </div>
</template>

<script>
import eventBus from '../api/eventBus'
import { mapGetters } from 'vuex'
import { default as swal } from 'sweetalert2'
import '../assets/css/order.css'
export default {
  data () {
    return {
      // show: false,
      workerInfo: null
    }
  },

  computed: {
  },

  created(){
  },

  mounted(){
    this.getWorkerInfo()
  },

  methods: {
    getWorkerInfo(){
        const that = this
        eventBus.$on('getWorkerInfo', function(data){
            that.show = true
            if(data.userInfo) that.workerInfo = data.userInfo
            if(data.companyInfo) that.workerInfo = data.companyInfo
        })
    },

    hideWorkerDialog(){
        this.workerInfo = null
    },

    routeOrderRelease(id){
        const title = id == 1 ? '找人' : '找物'
        this.$store.commit('GET_NAVTITLE', title)
        this.$store.commit('SET_ORDER_TYPE', id)
        this.$store.dispatch('get_second_level', id)
        this.$router.push({path: '/index/release'})
    },

    concat(uid){
      const that = this;
      console.log(uid)
    }
  }
}
</script>
<style>
.workdialog{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6,
}
.workdialog .workdialog-mask{
    width: 100%;
    height: 100%;
    background: #333333;
    opacity: 0.2;
}
.workdialog .workdialog-main{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    align-self: center;
}
.w-content{
    background: #ffffff;
    min-width: 300px;
    overflow: hidden;
    border-radius: 15px;
    padding-bottom: 10px;
}
.w-header{
    padding: 15px 0 35px;
    background-image: url('../assets/images/pic_qiandaotongzhi.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.w-header.send-one .info-credit{
    color: #FFFFFF;
    padding: 3px 0;
}
.w-header.send-one .info-credit .t_com{
    color: #FFFFFF;
}
.w-header.send-one .info-credit .icon-line{
    background: #FFFFFF;
}
.w-header.send-one .info-credit .tips{
  width: 60px;
  padding: 0 10px;
  height: 18px;
  line-height: 18px;
  border-radius: 9px;
  background: #4B505F;
  color: #FFFFFF;
  font-size: 10px;
}
.w-body{
    padding: 0 20px;
}
.w-body .flex-view{
    height: 28px;
    line-height: 20px;
    padding: 4px 0;
}
.w-body .flex-view.space-view{
  height: auto;
  max-height: 48px;
}
.w-body .flex-view span:last-child{
    margin-left: 10px;
}
.w-body .flex-view.space-view span:first-child{
  width: 22%;
  height: 100%;
}
.w-body .flex-view.space-view span:last-child{
  width: 78%;
  /* height: 100%; */
  max-height: 48px;
  /* white-space: normal; */
  margin: 0;
  display: -webkit-box;    
  -webkit-box-orient: vertical;    
  -webkit-line-clamp: 2;    
  overflow: hidden;
}
.w-footer{
   margin-top: 10px;
   padding: 0 20px 8px; 
}
.w-footer h5{
    padding-bottom: 5px;
    color: #666666;
}
.w-footer .flex-alc{
    flex-wrap: wrap;
}
.w-footer .flex-alc span{
    width: 24%;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 13px;
    background: #f1f1f1;
    margin: 3px 0;
}
.w-footer .flex-alc span:nth-child(2),
.w-footer .flex-alc span:nth-child(3),
.w-footer .flex-alc span:nth-child(6),
.w-footer .flex-alc span:nth-child(7){
    margin: 3px 1%;
}
.w-footer .w-btn{
    width: 75%;
    margin: 12px auto 0;
    text-align: center;
    height: 34px;
    line-height: 34px;
    border-radius: 8px;
    color: #FFFFFF;
}
.w-close{
   margin-top: 15px; 
}
.w-close img{
    width: 32px;
    height: 32px;
    display: block;
}
</style>
