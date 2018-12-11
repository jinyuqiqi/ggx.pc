<template>
    <div class="wrap">
        <!-- <v-nav-title :navtitle="mytitle"> -->
          <span class="f_i c_a" slot="mark"> (带<b style="color: red">*</b>为必填)</span>
        </v-nav-title>
        <!-- 找人 -->
        <div class="form-block" v-if="orderType == 1">
            <div class="blocks block1">
                <span class="demonstration"><b>* </b>需要工种</span>
                <div class="select-type" @click="routeMenu">
                    <span>{{typeName}}</span>
                    <i class="el-icon-caret-right" style="padding-left: 5px"></i>
                </div>
            </div>
            <div class="blocks block1" v-if="highEnable == 1">
                <span class="demonstration"><b>* </b>是否高于地面2米</span>
                <el-switch
                  v-model="switchModel"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
            </div>
            
            <div class="blocks block2">
                <span class="demonstration"><b>* </b>需要人数</span>
                <el-input-number v-model="quantity" :min="1" :max="10" label=""></el-input-number>
            </div>
            <div class="blocks">
                <span class="demonstration"><b>* </b>开始时间</span>
                <el-date-picker
                  v-model="startDate"
                  type="datetime"
                  placeholder="选择开始日期"
                  @change="getSTime"
                  :picker-options="endDateOpt">
                </el-date-picker>
            </div>
            <div class="blocks block2">
                <span class="demonstration"><b>* </b>需要天数</span>
                <el-input-number v-model="workDays" :min="1" :max="10" label=""></el-input-number>
            </div>
            <div class="blocks">
                <span class="demonstration"><b>* </b>工作地点</span>
                <div class="select-type" @click="routeAddress">
                    <span>{{locationdesc}}</span>
                    <i class="el-icon-caret-right" style="padding-left: 5px"></i>
                </div>
            </div>
            <div class="blocks br-block block3">
                <span class="demonstration">工作描述</span>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="memo">
                </el-input>
                <div class="imgbasebox" style="width: calc(100% - 20px);margin-top: 8px;margin-left: 12px;">
                    <div 
                        class="addbox pointer" 
                        v-for="(item, index) in imgs"
                        @click="handleRemove(index)">
                        <img :src="item" />
                        <div class="mask"><i class="el-icon-delete"></i></div>
                    </div>
                    <div class="addbox pointer">
                        <input type="file" @change="getImgBase" accept="image/*">
                        <div class="f_l">+</div>
                    </div>                    
                </div>
                
            </div>
            <div class="blocks block3">
                <span class="demonstration">预算金额</span>
                <div>
                    <el-input type="number" v-model="budget" placeholder="不填为面议"></el-input> 元/天
                </div>
            </div>
            <div class="blocks">
                <span class="demonstration">
                    支付方式
                    <i class="el-icon-question"></i>
                </span>
                <el-row style="text-align: center">
                    <el-button :class="mode == 2 ? 'active' : ''" @click="selectPayment(2)">
                        <el-radio v-if="mode == 2" v-model="radio" label="1">线下支付</el-radio>
                        <i v-else>线下支付</i>
                    </el-button>
                    <el-button :class="mode == 0 ? 'active' : ''" @click="selectPayment(0)">
                        <el-radio v-if="mode == 0" v-model="radio" label="1">托管全款</el-radio>
                        <i v-else>托管全款</i>
                    </el-button>
                    <el-button :class="mode == 1 ? 'active' : ''" @click="selectPayment(1)">
                        <el-radio v-if="mode == 1" v-model="radio" label="1">托管30%</el-radio>
                        <i v-else>托管30%</i>
                    </el-button>
                </el-row>
            </div>
            <div v-if="insureInfo&&insureArr" class="blocks br-block insure" style="border-bottom:none">
                <span class="demonstration">
                    用工保障 
                    <i class="el-icon-question"></i>
                    <p style="padding: 0;margin: 0;font-size: 10px;line-height:14px;">中国人寿 安全无忧 建议购买</p>
                </span>
                <el-row style="text-align: center;padding: 10px 0">
                    <el-button 
                        v-for="(item, index) in insureArr" 
                        :class="insure === index ? 'active' : ''" 
                        @click="selectInsure(index, item)">
                        <el-radio v-if="insure === index" v-model="radio" label="1">
                            {{item.title}}<span class="tag-p">({{item.ins_price}}元/人/天)</span>
                        </el-radio>
                        <i v-else>
                            {{item.title}}<span class="tag-p">({{item.ins_price}}元/人/天)</span>
                        </i>
                    </el-button>
                </el-row>
                <div class="insureFee">
                    <div class="item br-bm" v-if="severice>0">
                      <div>服务费</div>
                      <div v-if="mode==1">{{quantity}}人{{workDays}}天{{budget}}元× 0.3 &nbsp;&nbsp;&nbsp;<span>¥{{severice}}</span></div>
                      <div v-else>{{quantity}}人{{workDays}}天{{budget}}元&nbsp;&nbsp;&nbsp;<span>¥{{severice}}</span></div>
                    </div>
                    <div class="item br-bm">
                      <div>保险费</div><div>{{quantity}}人{{workDays}}天{{cost.ins_price}}元&nbsp;&nbsp;&nbsp;<span>¥{{cost.insure}}</span></div>
                    </div>
                    <div class="item br-bm">
                      <div>保险减免</div><div><span>-¥{{cost.dis}}</span></div>
                    </div>
                </div>
            </div>
            <div class="blocks block-pay">
                <span class="demonstration" style="color: #000000;font-weight: bold">
                    支付金额: <b>¥{{payAmount}}</b>
                </span>
                <div class="btn-release" @click="release">立刻发布</div>
            </div>
        </div>
        

        <!-- 找物 -->
        <div class="form-block" v-else>
            <div class="blocks block1">
                <span class="demonstration"><b>* </b>需要物品</span>
                <div class="select-type" @click="routeMenu">
                    <span>选择物品</span>
                    <i class="el-icon-caret-right" style="padding-left: 5px"></i>
                </div>
            </div>
            <div class="block4" v-if="task&&task.length >= 1">
                <div v-if="val.amount>=1" class="flex-between f_s br-bm c_a" v-for="(val, index) in task" track-by="$index">
                   <span class="demonstration" @click="handleChange('delete', index)">
                        <i class="el-icon-error" style="padding-right: 5px"></i>{{val.tname}}
                    </span>
                   <!-- <el-input-number v-model="val.amount" size="mini" :min="1" :max="100" label=""></el-input-number> -->
                   <div class="flex-alc flex-end cal">
                       <div class="f_w c_a icon-cal cal-l" @click="handleChange('minus', index)">－</div>
                       <input class="amountInput" v-model="val.amount" @change="changeNum('change', index)" type="number" />
                       <div class="f_w c_a icon-cal cal-r" @click="handleChange('add', index)">＋</div>
                   </div>
                </div>
            </div>
            <div class="blocks">
                <span class="demonstration"><b>* </b>选择使用时间</span>
                <el-date-picker
                  v-model="endDate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="getETime">
                </el-date-picker>
            </div>
            <div class="blocks">
                <span class="demonstration"><b>* </b>工作地点</span>
                <div class="select-type" @click="routeAddress">
                    <span>{{locationdesc}}</span>
                    <i class="el-icon-caret-right" style="padding-left: 5px"></i>
                </div>
            </div>
            <div class="blocks br-block block3">
                <span class="demonstration">工作描述</span>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="memo">
                </el-input>
                <div class="imgbasebox" style="width: calc(100% - 20px);margin-top: 8px;margin-left: 12px;">
                    <div 
                        class="addbox pointer" 
                        v-for="(item, index) in imgs"
                        @click="handleRemove(index)">
                        <img :src="item" />
                        <div class="mask"><i class="el-icon-delete"></i></div>
                    </div>
                    <div class="addbox pointer">
                        <input type="file" @change="getImgBase" accept="image/*">
                        <div class="f_l">+</div>
                    </div>   
                </div>  
            </div>
            <div class="blocks block-pay">
                <span class="demonstration" style="color: #000000;font-weight: bold">
                </span>
                <div class="btn-release" @click="release">立刻发布</div>
            </div>
        </div>
        <div class="wechatpaycode" v-if="qrCode!=null">  <!--  v-if="qrCode!=null" -->
            <div class="mask"></div>
            <div class="content">
                <h2>请用微信扫码支付</h2>
                <div class="svgcode" v-html="qrCode"></div>
                <span class="f_s pointer" @click="handleDialog">取消</span>
            </div><!--   -->
        </div> 
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import Dialog from '../dialog/dialog'
import { mapGetters } from 'vuex'
import { getBaseImg } from '../api/base'
import { formatDate } from '../api/filter'
// import { handlesuccess } from '../api/toast'
import { X_goodsOrder, X_peopleOrder, X_wechatPay } from '../api/xhr'
import { resCode } from '../api/config'
import NavTitle from '../components/secondpagenav.vue'

export default {
  data () {
    return {
        mode: 1,
        insure: 0,
        radio: '1',
        budget: 0,
        memo: '',
        quantity: 1,
        startDate: '',
        endDate: [],
        workDays: 1,
        imgs: [],
        base64Imgs: [],
        cost: {
            ins_price: 0,
            insure: 0,
            dis: 0,
            final: 0
        },
        switchModel: false,
        currentInsure: 0,
        // dialogImageUrl: '',
        // dialogVisible: false,
        endDateOpt: {
            disabledData: (time) => {
                return time.getTime() < this.startDate;
            }
        },
    }
  },

  computed: {
    mytitle(){
      return this.$store.state.order.ordertype == 1 ? '找人' : '找物'
    },

    orderType(){
        return this.$store.state.order.ordertype
    },

    severice(){
        if(this.mode == 2) return 0
        if(this.mode == 1) return parseFloat(this.workDays * this.quantity * this.budget * 0.3).toFixed(2)
        if(this.isReEdit) return this.bundle.prepay
        return parseFloat(this.workDays * this.quantity * this.budget)
    },

    prepay(){
        if(this.mode == 1) return this.severice
        if(this.isReEdit) return this.bundle.prepay
        return 0
    },

    typeName(){
        let typeName = this.bundle.workType ? this.bundle.workType : '选择工种'
        return typeName
    },

    highEnable(){
        return this.bundle.highEnable ? this.bundle.highEnable : 0
    },

    highAltitude(){
        return this.switchModel ? '1' : '0'
    },

    locationdesc(){
        let locationdesc = this.bundle.locationdesc ? this.bundle.locationdesc : '选择工作地点'
        return locationdesc
    },

    insureArr(){
        return this.switchModel ? this.$store.state.order.insureInfo.highInsuScheme : this.$store.state.order.insureInfo.insuScheme
    },

    insureInfo(){
        return this.$store.state.order.insureInfo
    },

    payAmount(){
        let a = parseFloat(this.severice) + this.cost.final
        return isNaN(a) ? this.cost.final : a
    },

    ...mapGetters(['task', 'qrCode', 'bundle', 'isReEdit'])
  },

  watch: {
    quantity:{
        handler: function (newVal, oldVal) {
            if(this.currentInsure==0) return
            this.cost = this.calculateInsure(this.insureInfo.favourableOn, newVal, this.workDays, this.currentInsure, this.insureInfo.favourableRatio)
        },
        deep: true
    },

    workDays: {
        handler: function (newVal, oldVal) {
            if(this.currentInsure==0) return
            this.cost = this.calculateInsure(this.insureInfo.favourableOn, this.quantity, newVal, this.currentInsure, this.insureInfo.favourableRatio)
        },
        deep: true
    },

    $route: {
      handler: function(val, oldVal){
        let title = this.orderType == 1 ? '找人' : '找物'
        if(this.$store.state.order.stairMenus.length <= 0){
          this.$store.dispatch('get_second_level', 1)
        }
        this.startDate = this.bundle.startTime ? this.bundle.startTime : ''
        this.endDate = this.bundle.endTime ? [this.bundle.startTime, this.bundle.endTime] : []

      },
      deep: true
    }
  },

  created(){
    const that = this
    if(that.isReEdit){
      console.log(that.bundle)
      that.workDays = that.bundle.workDays
      that.memo = that.bundle.memo
      if(that.$store.state.order.ordertype == 1){
         that.mode = that.bundle.manner
         that.insureArr.forEach((item, index) => {
           if(that.bundle.solutionCode == item.code) that.insure = index
         })
         that.switchModel =  that.bundle.highAltitude == 1 ? true : false 
      }
      if(that.bundle.img.length>0){
        that.bundle.img.forEach((item) => {
          that.imgs.push(item)
          that.base64Imgs.push(item)
        })
      }
    }
  },

  mounted(){
    this.startDate = this.bundle.startTime ? this.bundle.startTime : ''
    this.endDate = this.bundle.endTime ? [this.bundle.startTime, this.bundle.endTime] : []
  },

  methods: {
    routeMenu(){
        let title = this.orderType == 1 ? '选择工种' : '选择物品'
        if(this.$store.state.order.stairMenus.length <= 0){
          this.$store.dispatch('get_second_level', 1)
        }
        this.$store.commit('GET_NAVTITLE', title)
        this.$router.push({path: '/index/orderTags'})
    },

    routeAddress(){
        this.$router.push({path: '/index/address', query: {tid: this.$route.query.id}})
    },

    getSTime(e){
      this.startDate = formatDate(e)
      let res = {
        id: 1,
        time: formatDate(e)
      }
      this.$store.commit('GET_TIME', res)
    },

    getETime(e){
      // this.endDate = formatDate(e)
      let res = {
        id: 2,
        time: [formatDate(e[0]), formatDate(e[1])]
      }
      this.$store.commit('GET_TIME', res)
    },

    selectPayment(id){
        this.mode = id
    },

    selectInsure(index, item){
        const insureInfo = {}
        if(this.insure == index){
            this.insure = -1
            this.cost.insure = 0,
            this.cost.dis = 0,
            this.cost.final = 0
            insureInfo['isBuyIns'] = '0'
            this.$store.commit('SELECT_INSURE', insureInfo)
            return
        }
        insureInfo['isBuyIns'] = '1'
        insureInfo['insurance'] = item.ins_price
        insureInfo['solutionCode'] = item.code
        this.insure = index
        this.currentInsure = item.ins_price
        this.$store.commit('SELECT_INSURE', insureInfo)
        this.cost = this.calculateInsure(this.insureInfo.favourableOn, this.quantity, this.workDays, item.ins_price, this.insureInfo.favourableRatio)
        this.cost.ins_price = item.ins_price
    },
 
    changeNum(type, index, e){
        const res = {
          type: type,
          index: index,
          num: e.target.value
        }
        this.$store.commit('CHANGE_GOODS_NUM', res)
    },

    handleChange(type, index){
       const res = {
          type: type,
          index: index,
        }
        this.$store.commit('CHANGE_GOODS_NUM', res)
    },

    getImgBase(e){
      const that = this
      console.log(e.target.files[0].path)
      let imgurl = null
      let img = new Image()
      img.src = e.target.files[0].path
      img.onload = function(){
        imgurl = getBaseImg(img)
        imgurl = imgurl.replace('data:image/png;base64,', "");
        that.base64Imgs.push(imgurl)
        that.imgs.push(e.target.files[0].path)
        return
      }
    },

    handleRemove(index) {
        this.imgs.splice(index, 1)
        this.base64Imgs.splice(index, 1)
    },

    paramcheck(){
        let isFull = true
        if(this.orderType == 1&&!this.bundle.workType){
            this.$message('请选择需要工种')
            isFull = false
        } 
        if(this.orderType == 1&&this.startDate.length <= 0){
            this.$message('请选择开始时间')
            isFull = false
        } 
        if(!this.bundle.locationdesc){
            this.$message('请选择工作地址')
            isFull = false
        } 
        if((this.orderType == 1)&&(this.mode == 0 || this.mode == 1)&&(parseInt(this.budget) < 1)){
            this.$message('请输入至少为1的预算金额')
            isFull = false
        }
        if(this.orderType == 3&&this.$store.state.order.task.length <= 0){
            this.$message('请选择需要物品')
            isFull = false
        }
        if(this.orderType == 3&&!this.endDate[0]){
            this.$message('请选择使用时间')
            isFull = false
        }
        return isFull
    },

    wechatpay(oid){
        const that = this
        X_wechatPay({oid: oid}).then( res =>{
            console.log(res)
            that.$store.commit('PAY_SUCCESS', res.data.data.qrCode)
            // that.qrCode = res.data.data.qrCode
        })
    },

    getReleaseType(params){
        const that = this
        if(this.orderType == 1){
           X_peopleOrder(params).then(res => {
                if(res.data.code == resCode.success){
                    if(res.data.data.status == 0){
                        that.wechatpay(res.data.data.oid)
                        return
                    }
                    // handlesuccess('订单发布成功')
                    new Dialog().init({
                        showbtn: false,
                        title: '订单发布成功！',
                        icon: 'success',
                        hide: ()=>{
                            // that.$store.dispatch('get_details', {id: res.data.data.oid, route: true})
                        }
                    })
                }    
           })
        }else{
           X_goodsOrder(params).then(res => {
                if(res.data.code == resCode.success){
                    // handlesuccess('订单发布成功')
                    new Dialog().init({
                        showbtn: false,
                        title: '订单发布成功！',
                        icon: 'success',
                        hide: ()=>{
                            // that.$store.dispatch('get_details', {id: res.data.data.oid, route: true})
                        }
                    })
                    // that.$store.dispatch('get_details', {id: res.data.data.oid, route: true})
                }
           })
        }
        this.$store.commit('WIPE_PARAMS')
    },

    release(){
        if(!this.paramcheck()) return

        let params = {}

        if(this.orderType == 1){
          params = {
            memo: this.memo,
            manner: ''+this.mode,
            budget: ''+this.budget,
            prepay: ''+this.prepay,
            quantity: ''+this.quantity,
            workDays: ''+this.workDays,
            highAltitude: this.highAltitude
          }
        }else{
          params = {
            memo: this.memo,
            task: this.$store.state.order.task
          }
        }
        this.$store.commit('SELECT_OTHER_INFO', params)
        const img = JSON.stringify(this.base64Imgs)
        const bundle = JSON.stringify(this.bundle)

        this.getReleaseType({img: img, bundle: bundle})
        
    },

    calculateInsure(isDis, numPeople, numDay, price, discount){
        discount = isDis == 0 ? 0 : discount
        let insuranceExpenses = parseInt(numPeople * numDay * price * 100)/100
        let discountAmount = parseInt(numPeople * numDay * price * discount* 100)/100
        if(discountAmount>0&&discountAmount<=1){
            discountAmount = 1
        }
        let finalExpenses = insuranceExpenses - discountAmount
        return {
            insure: insuranceExpenses,
            dis: discountAmount,
            final: finalExpenses
        }
    },

    handleDialog(){
        this.$store.commit('HIDE_PAY_DIALOG')
        // this.qrCode = null
    }
  },

  components: {
    'v-nav-title': NavTitle
  }

}
</script>

<style>
.release{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.release-title{
    line-height: 50px;
    text-align: center;
    background: #FFFFFF;
    font-weight: bold;
    font-size: 16px;
    color: #666;
}
.release-title span{
    font-size: 12px;
}
.release-title span b{
    color: red
}
.form-block{
    width: 100%;
    height: calc(100% - 46px);
    margin: 8px 0 8px;
    padding: 15px 25px;
    background: #FFFFFF;
    overflow-y: auto
}
.blocks{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    margin: 0;
    border-bottom: 1px solid #eee;
}
.block-pay{
    margin-top: 30px;
    font-size: 16px;
}
.blocks .demonstration{
    line-height: 32px;
}
.blocks .select-type{
    cursor: pointer;
}
.blocks:last-child{
    border: none;
}
.br-block{
    display: block;
}
.blocks .el-input__inner{
    height: 32px;
    line-height: 32px;
}
.blocks .el-input-number{
    line-height: 30px;
}
.block1 .el-input__inner{
    width: 200px;
}
.block2 .el-input-number{
    width: 120px;
}
.block2 .el-input__inner{
    width: 120px;
}
.block3 .el-input{
    width: 100px;
}
.blocks .el-button{
    padding: 8px 18px;
}
.blocks .demonstration{
    color: #000000;
}
.blocks .demonstration b{
    color: red
}
.blocks .el-input__icon{
    line-height: 30px;
}
.blocks .el-input--suffix .el-input__inner{
    padding-left: 25px;
    padding-right: 0 
}
.block .el-input__prefix{
    left: 1px;
}
.blocks .el-textarea{
    width: calc(100% - 20px);
    margin-top: 8px;
    margin-left: 12px

}
.blocks .el-cascader-menu__item{
    padding-left: 10px;
    padding-right: 10px;
}
.blocks .btn-release{
    background: #ff9900;
    color: #FFFFFF;
    letter-spacing: 3px;
    width: 200px;
    text-align: center;
    line-height: 36px;
    cursor: pointer
}
.blocks .active{
    color: #409eff;
    background: #ecf5ff;
    border: 1px solid #daecff
}
.blocks.insure .el-button{
    padding: 15px;
}
.blocks.insure .el-button .tag-p{
    font-size: 11px;
}
.blocks .insureFee{
    line-height: 26px;
    font-size: 12px;
    color: #000;
}
.blocks .insureFee .item{
    overflow: hidden;
}
.blocks .insureFee .item div:first-child{
    float: left;
}
.blocks .insureFee .item div:last-child{
    float: right;
}
.blocks .insureFee .item div span{
    color: red
}
.imgwrap{
    width: calc(100% - 20px);
    margin-top: 8px;
    margin-left: 12px;
    display: flex;
    flex-wrap: wrap;
}
.blocks .el-upload-list--picture-card .el-upload-list__item,
.el-upload--picture-card{
  width: 72px;
  height: 72px;
  line-height: 80px;
}
.block4{
  padding: 5px 15px;
  line-height: 24px;
  border-bottom: 1px solid #eee;
}
.block4 .flex-between{
  padding: 5px 0;
}
.block4 .flex-between:last-child{
  border: none;
}
.cal{
  border: 1px solid #eeeeee;
  padding: 3px 0;
}
.cal .icon-cal{
  width: 24px;
  text-align: center;
}
.cal .cal-l{
  border-right: 1px solid #eeeeee;
}
.cal .cal-r{
  border-left: 1px solid #eeeeee;
}
.amountInput{
  width: 40px;
  text-align: center;
  border: none;
}
.blocks .el-input__icon {
    line-height: 22px;
}
.el-date-editor .el-range-separator {
    line-height: 24px;
}
.wechatpaycode{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: #333333;
    z-index: 1000;
}
.wechatpaycode .mask{
    width: 100%;
    height: 100%;
    background: #333333;
    opacity: 0.3
}
.wechatpaycode .content{
    position: absolute;
    width: 300px;
    height: 400px;
    top: 50%;
    left: 50%;
    background: #31af2a;
    transform: translate(-50%, -50%);
}
.wechatpaycode .content h2{
    text-align: center;
    line-height: 40px;
    margin: 40px 25px 50px;
    background: #FFFFFF;
    border-radius: 5px;
}
.wechatpaycode .content span{
    position: absolute;
    right: 10px;
    top: 10px;
    color: #ffffff;
}
.wechatpaycode .content .svgcode{
    position: absolute;
    left: 50%;
    bottom: 80px;
    transform: translateX(-50%);
    /* background: #FFFFFF; */
}
.imgbasebox{
    display: flex;
    flex-wrap: wrap;
}
.imgbasebox img{
    width: 68px;
    height: 68px;
    display: block;
}
.imgbasebox .addbox{
    width: 70px;
    height: 70px;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    border: 1px dashed #e6e6e6;
}
.imgbasebox .addbox input{
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    opacity: 0;
}
.imgbasebox .addbox .f_l{
    color: #999999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
.imgbasebox .mask{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #333333;
    opacity: 0
}
.imgbasebox .mask i{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FFFFFF
}
.imgbasebox .mask:hover{
    width: 100%;
    height: 100%;
    opacity: 0.4
}
</style>
