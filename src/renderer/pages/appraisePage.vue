<template>
    <div class="wrap">
        <!-- <v-nav-title :navtitle="navtitle"></v-nav-title> -->
        <div class="block">
            <div class="top-tle-bar br-bm c_m">
              订单已完成请对本次服务作出评价
            </div> 
            
            <div class="send-one br-bm" v-if="details.userInfo">
              <div class="info-photo">
                <img :src="details.userInfo.userphoto" />
              </div>

              <div class="info-credit f_s c_a">
                <div class="t_com">{{details.userInfo.nickname}}</div>
                <div>信用度: {{details.userInfo.credit}}分</div>
                <div class="flex-alc">
                  <span>发单数: {{details.userInfo.SendOrder}}</span>
                  <span class="icon-line"></span>
                  <span>接单数: {{details.userInfo.alternative}}</span>
                </div>
              </div>
            </div>
            <div class="assess">
                <div class="f_m">评价本次服务</div>
                <div class="assess-txt c_m">{{remark}}</div>
                <div class="icon-box flex-center">
                    <span class="pointer" v-for="(item, index) in stararr">
                        <img @click="gradestar(index)" v-if="index<=starIndex" src="../assets/images/star_color.png" />
                        <img @click="gradestar(index)" v-else src="../assets/images/star.png" />
                    </span>
                    <!-- <repeat for="{{5}}" key="index" index="index" item="item"> -->
                    
                    <!-- </repeat> -->
                </div>
            </div>
        </div>
        
        <div class="block">
            <div class="send-tags with-padding">
                <div 
                    class="tag-item pointer" 
                    v-for="(item, index) in tabList" 
                    @click="selectTab(index)"><span :class="item.sel ? 'active': ''">{{item.tag}}</span>
                </div>
            </div>
        </div>

        <div class="btn-for b_m pointer" @click="submitAppraise(value)">提交</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { handlesuccess } from '../api/toast'
import { X_getAppraise, X_appraise } from '../api/xhr'
import NavTitle from '../components/secondpagenav.vue'
import StarRate from 'vue-cute-rate' //评分星星组件
export default {
    components: {
        'v-nav-title': NavTitle,
        StarRate
    },

    data(){
        return{
            value: '', // 星级
            tabList:[],//评价标签
            stararr: [1,1,1,1,1],
            starIndex: 4,
            level: []
        }
    },

    computed: {
        ...mapGetters(['details', 'navtitle']),

        remark(){
            let remark = ''
            switch(this.starIndex) {
                case 0:
                    remark = '非常不满意';
                    break;
                case 1:
                    remark = '不满意，比较差';
                    break;
                case 2:
                   remark = '一般，还需要改善';
                    break;
                case 3:
                    remark = '比较满意，仍可改善';
                    break;
                case 4:
                   remark = '非常满意，无可挑剔';
                    break;
                default:
            }
            return remark
        }
    },

    created(){
        this.$store.commit('GET_NAVTITLE', "评价");
        this.getUserInfo();
    },

    methods:{
        //选择tab标签
        selectTab(index){
            this.tabList[index].sel = !this.tabList[index].sel
        },
        // 评分选择星星
        gradestar (index) {
            this.starIndex = index
            this.stararr.forEach((item, idx) => {
               if(idx <= index){
                 item == 1
               }else{
                 item == 0
               }
            })
            
        },
        //获取数据
        getUserInfo(){
            const params = {
                oid: this.details.orderInfo.oid
            };
            X_getAppraise(params).then(res =>{
                res.data.data.list.forEach((item) => {
                    this.tabList.push({
                        sel: false,
                        tag: item
                    })
                })
            })
        },
        //提交评价
        submitAppraise(){
            const that = this
            this.tabList.forEach((item) => {
               if(item.sel){
                  this.level.push(item.tag)
               }
            })
            const params = {
                oid: this.details.orderInfo.oid,
                tag: JSON.stringify(this.level),
                level: this.starIndex + 1,
            };
            X_appraise(params).then(res =>{
                handlesuccess('提交成功！')
                that.$store.dispatch('get_all_order')
                setTimeout(() => {
                  that.$router.go(-1)
                }, 2500)
                
            }).catch(err=>{

            })
        }
    }
}
</script>

<style scoped>
.appraise{
    width: 100%;
    height: 100%;
    background: #f3f4f5;
}
.wrap .send-one{
    padding: 15px 0;
}

.wrap .block{
    padding-top: 0;
}
.wrap .assess{
    padding: 10px 0;
    line-height: 36px;
}
.wrap .info-tags{
    height: 68px;
}
.wrap .send-one .t_com{
    width: auto;
}
.wrap .btn-for{
    width: 108px;
    line-height: 42px;
    margin: 30px auto 0;
    text-align: center;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 0 0 0 10px;
    letter-spacing: 10px;
    box-sizing: border-box;
}
.wrap .block span.active{
    background: #ff7e22;
    color: #FFFFFF;
}
</style>