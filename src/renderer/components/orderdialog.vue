<template>
    <div class="floatOrder" v-if="show">
        <div class="mask"></div>
        <div id="floatDialog" class="block popup" v-if="show">  
            <div class="top-bar f_s clearfix">
                <div class="fl flex-alc" v-if="dialog.isBuyIns == 1">
                    <i class="iconfont icon-Subtraction icon-main"></i>
                    <span class="c_m">发单方已支付保险费用</span>
                </div>
                <div class="fr">
                    <span class="c_t">匹配度:{{dialog.match}}%</span>
                </div>
            </div>
            <div class="header-tle br-bm">
                <div class="t_lar c_m">距离您{{dialog.distance | filter_parsefloat}}公里</div>
                <div class="t_com c_t">{{dialog.locationdesc}}</div>
            </div>
            <div class="send-one br-bm">
                <div class="info-photo">
                    <img :src="dialog.userphoto"/>
                </div>
                <div class="info-credit f_s c_a">
                    <div class="f_l c_t f_w">{{dialog.nickname}}</div>
                    <div>信用度: {{dialog.credit}}分</div>
                    <div class="flex-alc">
                        <span>发单数: {{dialog.SendOrder}}</span>
                        <span class="icon-line"></span>
                        <span>接单数: {{dialog.alternative}}</span>
                    </div>
                </div>
            </div>
            <div class="column br-bm c_a f_l" style="padding: 5px 0">
                <div class="column-li">
                    <div class="column-li-sub">{{dialog.type == '1'? '需要工人: ': '需要物品: '}}</div>
                    <div class="column-li-sub">
                        <span v-for="(val, index) in dialog.task">{{val.name}} X{{val.amount}}</span>
                    </div>
                </div>
                <div class="column-li">
                    <div class="column-li-sub">使用工期: </div>
                    <div class="column-li-sub">{{dialog.period}}</div>
                </div>
                <div class="column-li">
                    <div class="column-li-sub">工作内容: </div>
                    <div class="column-li-sub">
                       <div>{{dialog.memo}}</div>
                    </div>
                </div>
                <div class="column-li" style="margin-bottom: 0">
                    <div class="column-li-sub">支付金额: </div>
                    <div class="column-li-sub">
                        <span class="tag-m f_m f_w">¥{{dialog.money}}</span>
                        <span v-if="dialog.manner == '1'">(已支付全款)</span>
                        <span v-if="dialog.manner == '0'">(预付30%)</span>
                        <span v-if="dialog.manner == '2'">(总金额)</span>
                    </div>
                </div>
            </div>

            <div class="column c_a f_l" style="padding: 5px 0">
                <div class="info-tags flex-between f_l">
                    <div v-for="(item ,index) in dialog.appraise" class="tag-item"><span>{{item}}</span></div>
                </div>
            </div>
            <div class="btn-xl f_m b_m pointer">接单</div>
            <i class="iconfont icon-close pointer"  @click="handleDialog('hide')"></i>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { handlenotice, handlesuccess } from '../api/toast'
import { X_grabOrder } from '../api/xhr'
import { mapGetters } from 'vuex'
import '../assets/css/order.css'


export default {
  data () {
    return { 
        
    }
  },

  computed: {

    ...mapGetters(['dialog', 'show'])

  },

  mounted(){
    
  },

  watch: {

  },

  methods: {
    handleDialog(type){
        this.$store.commit('HIDE_DIALOG')
        if(type == 'leave'){
            this.$router.push({path: '/index/orders'})
        }
    },

    graborder(oid){
        const that = this
        console.log('ooo')
        X_grabOrder({oid: oid}).then((res) =>{
            that.$store.commit('HIDE_DIALOG')
            handlesuccess('接单成功', '请及时与对方联系，确保订单无误')
            that.$store.dispatch('get_details', {id: oid, route: true})
        })
        that.$store.commit('HIDE_DIALOG')
    }
  }

}
</script>

<style>
.floatOrder{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100000;
}
.floatOrder .mask{
    width: 100%;
    height: 100%;
    background: #999999;
    opacity: 0.2;
}
.floatOrder .popup{
    position: absolute;
    opacity: 1;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 42%;
    width: 300px;
    padding: 20px 15px 5px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #CCCCCC;
}
.floatOrder .popup .header-tle{ 
    line-height: 20px
}
.floatOrder .popup .top-bar{
    padding: 0;
}
.floatOrder .popup .t_lar{
    padding: 0;
    font-size: 12px
}
.floatOrder .popup .top-bar .iconfont{
    font-size: 10px;
    margin-right: 5px
}
.floatOrder .popup .t_com{
    font-size: 12px
}
.floatOrder .popup .send-one{
    padding: 12px 0;
    margin: 0;
}
.floatOrder .popup .btn-xl{
    width: 100%;
    height: 26px;
    line-height: 26px;
    margin: 5px auto 10px;
    text-align: center;
    border-radius: 3px;
    letter-spacing: 5px;
    padding-left: 5px;
    color: #FFFFFF;
    font-size: 12px
}
.floatOrder .popup .info-credit div{
    white-space: nowrap;
}
.floatOrder .popup .info-credit .t_com{
    width: auto;
    font-size: 14px;
}
.floatOrder .popup .info-credit .info-credit .icon-line{
    margin: 0 6px;
}
.floatOrder .popup .info-tags{
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    margin-left: 0;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 6px 0;
}
.floatOrder .popup .info-tags .tag-item{
    width: 33.33%;
    padding: 0 3px;
}
.floatOrder .popup .info-tags .tag-item span{
    margin: 3px 0;
    padding: 0 5px;
    border-radius: 3px;
    height: 20px;
    line-height: 20px;
}
.floatOrder .popup .info-photo img {
    width: 48px;
    height: 48px;
    display: block;
}
.floatOrder .popup .icon-close{
    position: absolute;
    top: 5px;
    right: 8px;
    font-size: 16px
}
</style>
