<template>
  <div class="wrap" v-if="details.orderInfo">
      <!-- <v-nav-title :navtitle="navtitle"></v-nav-title> -->

      <div class="block">
          <div class="top-tle-bar c_m" v-if="status == '-1'">
              正在获取数据...
          </div>
          <div class="top-tle-bar" v-if="status == '0'">已为您通知了 
                <span class="c_m f_l">{{alreadyPush}}</span> 位客户
          </div>
          <div class="top-tle-bar c_m" v-if="status == '2'">
              订单已生成，请联系对方，确保订单无误
          </div>
          <div class="top-tle-bar c_m" v-if="status == '4'">
              订单已开始，完成后记得评价
          </div>
          <div class="top-tle-bar c_m" v-if="status == '7'">
              恭喜完成订单，系统奖励会发到您的账户
          </div>
          <div class="top-tle-bar c_m" v-if="details.orderType == 0&&status == '8'">
              订单已取消，再下一单吧
          </div> 
          <div class="top-tle-bar c_m" v-if="details.orderType == 1&&status == '8'">
              订单已取消，可在周边订单查看更多
          </div> 

          <div class="send-one br-tp" v-if="details.userInfo">
              <div class="info-photo">
                  <img :src="details.userInfo.userphoto" />
              </div>

              <div class="info-credit f_s c_a">
                  <div class="t_com">{{details.userInfo.nickname}}</div>
                  <div>联系方式: {{details.userInfo.phone}}</div>
                  <div>信用度: {{details.userInfo.credit}}分</div>
                  <div class="flex-alc">
                      <span>发单数: {{details.userInfo.SendOrder}}</span>
                      <span class="icon-line"></span>
                      <span>接单数: {{details.userInfo.alternative}}</span>
                  </div>
              </div>

              <div class="info-tags">
                  <div v-for="(item ,index) in details.userInfo.tags" class="tag-item f_s"><span>{{item}}</span></div>
              </div>
          </div>
        </div>

        <div class="block">
          <div class="column br-bm">
            <div class="column-li">
                <div class="column-li-sub" v-if="details.orderInfo.type == '1'">需要工人: </div>
                <div class="column-li-sub" v-if="details.orderInfo.type == '3'">需要物品: </div>
                <div class="column-li-sub">
                    <span v-for="(val, index) in details.orderInfo.task">{{val.name}} X{{val.amount}}&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
            <div class="column-li">
                <div class="column-li-sub">使用工期: </div>
                <div class="column-li-sub">{{details.orderInfo.period}}</div>
            </div>
            <div class="column-li">
                <div class="column-li-sub">工作内容: </div>
                <div class="column-li-sub">
                   <div v-if="details.orderType == 1">{{details.orderInfo.memo==''?'发单方未编辑工作内容':details.orderInfo.memo}}</div>
                   <div v-if="details.orderType == 0">{{details.orderInfo.memo==''?'您没有编辑工作内容':details.orderInfo.memo}}</div>
                   <div class="pics" v-if="details.orderInfo.img[0]">
                      <div class="imgbox" v-for="(val, index) in details.orderInfo.img" >
                         <img :src="val" preview="0" />
                      </div>
                   </div>
                </div>
            </div>
            <div class="column-li">
                <div class="column-li-sub" v-if="details.orderInfo.type == '1'">工作地址: </div>
                <div class="column-li-sub" v-if="details.orderInfo.type == '3'">使用地址: </div>
                <div class="column-li-sub">{{details.orderInfo.locationdesc}}</div>
            </div>
          </div>
          <div class="pay-info flex-between">
                <div class="f_w">线下支付:</div>
                <div class="f_s c_t">
                  <div><span>预算总金额: </span><span class="f_z c_t">{{details.orderInfo.manner == '2' ? '面议' :'¥ '+ details.orderInfo.money}}</span></div>
                  <div v-if="details.orderInfo.manner == '1'"><span>已支付全款: </span><span class="f_z c_m">¥ {{details.orderInfo.prepay}}</span></div>
                </div>
          </div>
          <div class="top-bar f_s clearfix" v-if="details.orderInfo.type == '1'&&details.orderInfo.isBuyIns == 1">
                <div class="fl flex-alc">
                    <img class="icon-sign" src='../assets/images/img-logo-b@2x.png'/>
                    <span class="c_m" v-if="details.orderType == 0">您以为本单支付保险费用</span>
                    <span class="c_m" v-if="details.orderType == 1">发单方已支付保险费用</span>
                </div>
                <div class="fr f_s flex-alc">
                    <img class="icon-mini" src='../assets/images/warn.png'/>
                    <span class="c_r f_i">投保规则</span>
                </div>
          </div>
          <div class="top-bar top-bar-br f_s clearfix br-tp">
              <div class="fl flex-alc c_a">
                   <span>订单编号: </span> <span> {{details.orderInfo.orderNumber}}</span>
              </div>
          </div>  
      </div>

      <div class="flex-end buttons f_m">
          <div 
              class="b_m btn btn-for pointer" 
              @click="handleOrder(details.orderInfo.oid, 'cancel')" 
              v-if="details.orderInfo.status == '0'">
              取消</div>
          <div 
              class="b_m btn btn-for pointer" 
              @click="handleOrder(details.orderInfo.oid, 'applycancel')" 
              v-if="details.orderInfo.status == '2'||details.orderInfo.status == '4'">
              申请取消</div>
          <div 
              class="b_m btn btn-for pointer" 
              @click="handleOrder(details.orderInfo.oid, 'appraise')" 
              v-if="details.orderInfo.status == '7'&&details.appraiseExists == '0'">
              评价</div>
          <div 
              class="b_m btn btn-for pointer"
              @click="handleOrder(details.orderInfo.oid, 'complete')" 
              v-if="details.orderInfo.status == '4'">
              完成</div>
          <div 
              class="b_m btn btn-for pointer"
              @click="handleOrder(details.orderInfo.oid, 'delete')" 
              v-if="details.orderInfo.status == '8'">
              删除</div>
          <div 
              class="b_m btn btn-for pointer"
              @click="handleOrder(details.orderInfo.oid, 'route')" 
              v-if="details.orderInfo.status == '8'">
              周边订单</div>
      </div>
  </div>
</template>

<script>
import '../assets/css/order.css'
import { mapGetters } from 'vuex'
import NavTitle from '../components/secondpagenav.vue'
import { handlesuccess, handlemodal } from '../api/toast'
import { X_orderCancel, X_orderComplete, X_deleteCompleteOrder, X_orderApplyCancel } from '../api/xhr'
export default {
  data () {
    return {
      
    }
  },

  computed: {
    ...mapGetters(['details', 'navtitle', 'alreadyPush']),

    status(){
      return this.$store.state.order.details.orderInfo ? this.$store.state.order.details.orderInfo.status : '-1'
    },

    navtitle(){
      let title = ''
      switch(this.status){
          case '-1':
            title = '加载中';
            break;
          case '0':
            title = '待抢单';
            break;
          case '2':
            title = '未开始';
            break;
          case '4':
            title = '已开始';
            break;
          case '7':
            title = '已完成';
            break;
          case '8':
            title = '已取消';
            break;
      }
      return title
    }
  },

  methods: {
      handleOrder(oid, handle){
        const params = {oid: oid}
        switch(handle){
          case 'cancel':
            handlemodal('确定取消订单？', '', this.handleCancel, params)   
            break;
          case 'applycancel':
            this.$router.push({ path: '/index/cancel' })
            break;
          case 'appraise':
            this.$router.push({path: '/index/appraisePage'})
            break;
          case 'complete':
            handlemodal('确定订单已完成？', '', this.handleComplete, params) 
            break;
          case 'delete':
            handlemodal('确定删除订单？', '', this.handleDelete, params) 
            break;
          case 'route':
            this.$store.commit('SWITCH_TYPE', 0)
            this.$router.push({path: '/index/orders'});
            break;
          default:
            break;
        }
      },

      handleCancel(params){
        const that = this
        // const oid = this.details.orderInfo.oid
        X_orderCancel(params).then(res => {
              handlesuccess('订单取消成功！')
              that.$store.dispatch('get_details', {id: params.oid, route: false})
        })
      },

      handleComplete(params){
        const that = this
        // const oid = this.details.orderInfo.oid
        X_orderComplete(params).then(res =>{
          handlesuccess('恭喜完成订单！', '系统奖励会发到您的账户')
          that.$store.dispatch('get_details', {id: params.oid, route: false})
        })
      },

      handleDelete(params){
        const that = this
        // const oid = this.details.orderInfo.oid
        X_deleteCompleteOrder(params).then(res =>{
          handlesuccess('订单已删除！')
          that.$router.go(-1)
        })
      },
  },

  created(){
  },

  components: {
    'v-nav-title': NavTitle
  }
}
</script>

<style scoped>
.top-bar{
  padding: 5px 0;
}
.wrap .info-credit .t_com{
  width: auto;
}
.wrap .info-tags{
  /* justify-content: flex-end  */
}
.wrap .info-tags .tag-item{
  width: 25%;
  padding: 0 15px;
}
.wrap .send-one .flex-alc{
  justify-content: flex-start;
}
.wrap .buttons{
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
}
.wrap .buttons .btn{
  margin-left: 20px;
  border-radius: 16px;
  color: #FFFFFF;
}
</style>
