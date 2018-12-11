<template>
  <div id="wrap" :class="type == 0 ? 'wrap1' : 'wrap2'">
    <div id="list-box">
        <!-- 周边订单 -->
        <div class="block" v-if="type == 0" v-for="(card, index) in data">  
            <div class="top-bar f_l  br-bm clearfix">
                <div class="fl flex-alc f_w">
                    距离您<span class="c_m">{{card.distance | filter_parsefloat}}</span>公里
                </div>
                <div class="fr">
                    <span class="c_m">匹配度: {{card.match}}</span>
                </div>
            </div>
            <div class="column" v-if="card.img&&card.img.length>0">
                <div class="column-imgs" v-if="card.img&&card.img.length>0">
                    <img v-if="card.img.length>4" @click="slider(index, 'left', $event)" class="slip slip-l pointer" src="../assets/images/arrow_r.png" alt="" />
                    <img v-if="card.img.length>4" @click="slider(index, 'right', $event)" class="slip slip-r pointer" src="../assets/images/arrow_l.png" alt="" />
                    <div class="column-slider">
                        <div class="column-imgs-box flex-alc">
                            <div class="little-box pointer" 
                                @mouseenter="enter($event)" 
                                @mouseleave="leave($event)" 
                                v-for="(val, idx) in card.img">
                                <div class="preview-icon f_i pointer">
                                    <i class="iconfont icon-iconfontyulan icon-white"></i>
                                    <span>预览</span>
                                </div>
                                <img :src="val" preview="index" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column br-bm">
                <div class="column-li f_l">
                    <div class="column-li-sub">工作内容: </div>
                    <div class="column-li-sub c_t">
                       <div>{{card.memo==''?'发单方未编辑':card.memo}}</div>
                    </div>
                </div>
                <div class="column-li f_l" v-if="card.audio!=''">
                    <div class="column-li-sub">语音详情: </div>
                    <div class="column-li-sub flex-alc">
                       <div class="speechbox" :style="{width: 30+parseInt(card.audioDuration)*4 + 'px'}" @click="speech(card.audio, $event)">
                           <span></span>
                           <i class="iconfont icon-yuyin icon-grey"></i>
                       </div>
                       <p>{{card.audioDuration}}″</p>
                    </div>
                </div>
            </div>
            <div class="column br-bm f_l" style="padding-top: 3px;padding-bottom: 3px;">
                <div class="column-li">
                    <div class="column-li-sub">工作地址: </div>
                    <div class="column-li-sub c_t f_w">
                        {{card.locationdesc}}
                    </div>
                </div>
            </div>
            <div class="send-one br-bm">
                <div class="info-photo">
                    <img :src="card.userphoto"/>
                </div>
                <div class="info-credit f_s c_a">
                    <div class="f_l c_t f_w">{{card.nickname}}</div>
                    <div>信用度: {{card.credit}}分 联系方式: {{card.phone}}</div>
                    <div class="flex-alc">
                        <span>发单数: {{card.SendOrder}}</span>
                        <span class="icon-line"></span>
                        <span>接单数: {{card.alternative}}</span>
                    </div>
                </div>
                <div class="info-tags f_l c_a" v-if="card.appraise&&card.appraise.length > 0">
                    <div v-for="(item ,index) in card.appraise" class="tag-item f_s"><span>{{item}}</span></div>
                </div>
            </div>
            <div class="column column2 f_s">
                <div class="column-li">
                    <div class="column-li-sub c_a">使用工期: </div>
                    <div class="column-li-sub">{{card.period}}</div>
                </div>
                <div class="column-li">
                    <div class="column-li-sub c_a" v-if="card.type=='1'">需要工人: </div>
                    <div class="column-li-sub c_a" v-if="card.type=='3'">需要物品: </div>
                    <div class="column-li-sub">
                        <span v-for="(val, index) in card.task">{{val.name}} X{{val.amount}}</span>
                    </div>
                </div>
                <div class="column-li" v-if="card.type!='3'">
                    <div class="column-li-sub c_a">预算金额: </div>
                    <div class="column-li-sub">
                        <span v-if="card.manner == '1'">预付30%</span>
                        <span v-if="card.manner == '0'">线上全款</span>
                        <span v-if="card.manner == '2'">线下支付</span>
                        <span class="tag-m f_l f_w c_t">¥ {{card.money}} </span>
                        <span>(总金额)</span>
                    </div>
                </div>
                <div class="btn-g b_m f_l pointer" @click="handleOrder(card.oid, 'grab')">抢单</div>
            </div>
            <div v-if="card.isBuyIns==1&&card.type!='3'" class="column column2 f_s" style="padding-top: 0;padding-bottom: 3px">
                <span class="c_m">发单方已支付保险费用</span>
            </div>
        </div>
        

        <!-- 我的订单                      我发的单-->
        <div class="block"                          
             v-if="type == 1" 
             v-for="(card, index) in data">
             <div class="top-bar f_l  br-bm clearfix">
                <div class="fl flex-alc f_w" v-if="card.status!='0'&&card.type!='3'&&card.isBuyIns == 1">
                    您已为本单支付保险费用
                </div>
                <div class="fr">
                    <span v-if="card.status=='0'" class="c_r">{{card.status | filter_status}}</span>
                    <span v-if="card.status=='2'" class="c_r">{{card.status | filter_status}}</span>
                    <span v-if="card.status=='4'" class="c_m">{{card.status | filter_status}}</span>
                    <span v-if="card.status=='7'" class="c_g">{{card.status | filter_status}}</span>
                    <span v-if="card.status=='8'" class="c_rd">{{card.status | filter_status}}</span>
                </div>
            </div>
            <div class="send-one" v-if="card.uid!=''" style="padding: 18px 25px;margin: 0">
                <div class="info-photo">
                    <img :src="card.userphoto"/>
                </div>
                <div class="info-credit f_s c_a">
                    <div class="f_l c_t f_w">{{card.nickname}}</div>
                    <div>信用度: {{card.credit}}分 联系方式: {{card.phone}}</div>
                    <div class="flex-alc">
                        <span>发单数: {{card.SendOrder}}</span>
                        <span class="icon-line"></span>
                        <span>接单数: {{card.alternative}}</span>
                    </div>
                </div>
            </div>
            <div class="send-one f_l c_a flex-center" 
                 v-if="card.appraise&&card.appraise.length > 0"
                 style="padding: 0 25px;margin: 0">
                <div v-for="(item ,index) in card.appraise" class="tag-item f_s"><span>{{item}}</span></div>
            </div>
            <div class="column" v-if="card.status=='0'" :class="card.status != '0' ? 'br-tp' : ''">
                <div class="column-imgs" v-if="card.img&&card.img.length>0">
                    <img v-if="card.img.length>4" @click.stop="slider(index, 'left', $event)" class="slip slip-l pointer" src="../assets/images/arrow_r.png" alt="" />
                    <img v-if="card.img.length>4" @click.stop="slider(index, 'right', $event)" class="slip slip-r pointer" src="../assets/images/arrow_l.png" alt="" />
                    <div class="column-slider">
                        <div class="column-imgs-box flex-alc">
                            <div class="little-box pointer" 
                                @mouseenter="enter($event)" 
                                @mouseleave="leave($event)" 
                                v-for="(val, idx) in card.img">
                                <div class="preview-icon f_i pointer">
                                    <i class="iconfont icon-iconfontyulan icon-white"></i>
                                    <span>预览</span>
                                </div>
                                <img :src="val" preview="index" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column br-bm">
                <div class="column-li f_l">
                    <div class="column-li-sub">工作内容: </div>
                    <div class="column-li-sub c_t">
                       <div>{{card.memo==''?'发单方未编辑':card.memo}}</div>
                    </div>
                </div>
                <div class="column-li f_l" v-if="card.audio!=''">
                    <div class="column-li-sub">语音详情: </div>
                    <div class="column-li-sub flex-alc">
                       <div class="speechbox" :style="{width: 30+parseInt(card.audioDuration)*4 + 'px'}" @click="speech(card.audio, $event)">
                           <span></span>
                           <i class="iconfont icon-yuyin icon-grey"></i>
                       </div>
                       <p>{{card.audioDuration}}″</p>
                    </div>
                </div>
            </div>
            <div class="column br-bm f_l" v-if="card.status=='0'" style="padding-top: 3px;padding-bottom: 3px;">
                <div class="column-li">
                    <div class="column-li-sub">工作地址: </div>
                    <div class="column-li-sub c_t f_w">
                        {{card.locationdesc}}
                    </div>
                </div>
            </div>
            <div class="column column2 f_s" v-if="card.status=='0'">
                <div class="column-li">
                    <div class="column-li-sub c_a">使用工期: </div>
                    <div class="column-li-sub">{{card.period}}</div>
                </div>
                <div class="column-li">
                    <div class="column-li-sub c_a">需要工人: </div>
                    <div class="column-li-sub">
                        <span v-for="(val, index) in card.task">{{val.name}} X{{val.amount}}</span>
                    </div>
                </div>
                <div class="column-li" v-if="card.type!='3'">
                    <div class="column-li-sub c_a">预算金额: </div>
                    <div class="column-li-sub">
                        <span v-if="card.manner == '1'">预付30%</span>
                        <span v-if="card.manner == '0'">线上全款</span>
                        <span v-if="card.manner == '2'">线下支付</span>
                        <span class="tag-m f_l f_w c_t">¥ {{card.money}} </span>
                        <span>(总金额)</span>
                    </div>
                </div>
            </div>
            <div class="column column2 flex-alc f_s" v-if="card.status!='0'">
                <div class="column-imgs column-pic" v-if="card.img&&card.img.length>0">
                    <img v-if="card.img.length>1" @click.stop="slider(index, 'left', $event)" class="slip slip-l pointer" src="../assets/images/arrow_r.png" alt="" />
                    <img v-if="card.img.length>1" @click.stop="slider(index, 'right', $event)" class="slip slip-r pointer" src="../assets/images/arrow_l.png" alt="" />
                    <div class="column-slider">
                        <div class="column-imgs-box flex-alc">
                            <div class="little-box pointer" 
                                @mouseenter.stop="enter($event)" 
                                @mouseleave.stop="leave($event)" 
                                v-for="(val, idx) in card.img">
                                <div class="preview-icon f_i pointer">
                                    <i class="iconfont icon-iconfontyulan icon-white"></i>
                                    <span>预览</span>
                                </div>
                                <img :src="val" preview="index" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="column-li">
                        <div class="column-li-sub c_a">使用工期: </div>
                        <div class="column-li-sub">{{card.period}}</div>
                    </div>
                    <div class="column-li">
                        <div class="column-li-sub c_a" v-if="card.type=='1'">需要工人: </div>
                        <div class="column-li-sub c_a" v-if="card.type=='3'">需要物品: </div>
                        <div class="column-li-sub">
                            <span v-for="(val, index) in card.task">{{val.name}} X{{val.amount}}</span>
                        </div>
                    </div>
                    <div class="column-li" v-if="card.type!='3'">
                        <div class="column-li-sub c_a">预算金额: </div>
                        <div class="column-li-sub">
                            <span v-if="card.manner == '1'">预付30%</span>
                            <span v-if="card.manner == '0'">线上全款</span>
                            <span v-if="card.manner == '2'">线下支付</span>
                            <span class="tag-m f_l f_w c_t">¥ {{card.money}} </span>
                            <span>(总金额)</span>
                        </div>
                    </div>
                    <div class="column-li">
                        <div class="column-li-sub c_a">工作地址: </div>
                        <div class="column-li-sub">
                            {{card.locationdesc}}
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="column column2 f_s br-tp">
                <div class="column-li">
                    <div class="column-li-sub c_a">订单编号: </div>
                    <div class="column-li-sub">
                        {{card.orderNumber}}
                        <i class="iconfont icon-dingdan" style="font-size: 15px"></i>
                    </div>
                </div>
                <div class="column-li">
                    <div class="column-li-sub c_a">发布时间: </div>
                    <div class="column-li-sub">{{card.publishTime}}</div>
                </div>
                <div class="column-li" v-if="card.status=='7'">
                    <div class="column-li-sub c_a">完成时间: </div>
                    <div class="column-li-sub">{{card.finishTime}}</div>
                </div>
                <div class="btn-gs flex-end" v-if="card.status!='0'">
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="handleOrder(card.id, 'compete')" 
                        v-if="card.status=='2'">
                    申请取消</div> 
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="completeOrder(card.id)" 
                        v-if="card.status=='4'">
                    完成</div>
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="handleOrder(card.id, 'appraise')" 
                        v-if="card.status == '7'&&card.appraiseExists == '0'">
                    评价</div>
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="deleteOrder(card.id)" 
                        v-if="card.status == '7'&&card.appraiseExists == '1'">
                    删除</div>
                    <div 
                        class="btn-g f_l"
                        @click.stop="handleOrder(card.id, 'compete')"
                        v-if="card.status=='7'">
                    投诉</div>
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="reEdit(card.id, card.type)" 
                        v-if="card.status == '8'">
                    重新编辑</div>
                </div>
            </div>
            <div v-if="card.status=='0'" class="column column2 br-tp f_s" style="padding-top: 10px;padding-bottom: 10px;min-height:38px">
                <span v-if="card.isBuyIns == 1&&card.type!='3'" class="c_m">您已为本单支付保险费用</span>
                <div class="btns-box flex-alc">
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="directCancel(card.id)">
                        取消</div>
                </div>
            </div>
        </div>
        

        <!-- 我接的单                -->
        <div class="block"          
             v-if="type == 2" 
             v-for="(card, index) in data">
             <div class="top-bar f_l clearfix" v-if="card.status!='0'">
                <div class="fl flex-alc f_w c_m" v-if="card.isBuyIns == 1&&card.type!='3'">
                    发单方已为您支付保险费用<span v-if="card.status=='2'">，请前往录入被保人信息方可生效</span>
                </div>
                <div class="fr">
                    <span v-if="card.status=='2'" class="c_r">{{card.status | filter_r_status}}</span>
                    <span v-if="card.status=='4'" class="c_m">{{card.status | filter_r_status}}</span>
                    <span v-if="card.status=='7'" class="c_g">{{card.status | filter_r_status}}</span>
                    <span v-if="card.status=='8'" class="c_rd">{{card.status | filter_r_status}}</span>
                </div>
            </div>
            <div class="column br-tp">
                <div class="column-imgs" v-if="card.img&&card.img.length>0">
                    <img v-if="card.img.length>4" @click="slider(index, 'left', $event)" class="slip slip-l pointer" src="../assets/images/arrow_r.png" alt="" />
                    <img v-if="card.img.length>4" @click="slider(index, 'right', $event)" class="slip slip-r pointer" src="../assets/images/arrow_l.png" alt="" />
                    <div class="column-slider">
                        <div class="column-imgs-box flex-alc">
                            <div class="little-box pointer" 
                                @mouseenter="enter($event)" 
                                @mouseleave="leave($event)" 
                                v-for="(val, idx) in card.img">
                                <div class="preview-icon f_i pointer">
                                    <i class="iconfont icon-iconfontyulan icon-white"></i>
                                    <span>预览</span>
                                </div>
                                <img :src="val" preview="index" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column br-bm">
                <div class="column-li f_l">
                    <div class="column-li-sub">工作内容: </div>
                    <div class="column-li-sub c_t">
                       <div>{{card.memo==''?'发单方未编辑':card.memo}}</div>
                    </div>
                </div>
                <div class="column-li f_l" v-if="card.audio!=''">
                    <div class="column-li-sub">语音详情: </div>
                    <div class="column-li-sub flex-alc">
                       <div class="speechbox" :style="{width: 30+parseInt(card.audioDuration)*4 + 'px'}" @click="speech(card.audio, $event)">
                           <span></span>
                           <i class="iconfont icon-yuyin icon-grey"></i>
                       </div>
                       <p>{{card.audioDuration}}″</p>
                    </div>
                </div>
            </div>
            <div class="column br-bm f_l" style="padding-top: 3px;padding-bottom: 3px;">
                <div class="column-li">
                    <div class="column-li-sub">工作地址: </div>
                    <div class="column-li-sub c_t f_w">
                        {{card.locationdesc}}
                    </div>
                </div>
            </div>
            <div class="send-one br-bm"  v-if="card.uid&&card.uid!=''">
                <div class="info-photo">
                    <img :src="card.userphoto"/>
                </div>
                <div class="info-credit f_s c_a">
                    <div class="f_l c_t f_w">{{card.nickname}}</div>
                    <div>信用度: {{card.credit}}分 联系方式: {{card.phone}}</div>
                    <div class="flex-alc">
                        <span>发单数: {{card.SendOrder}}</span>
                        <span class="icon-line"></span>
                        <span>接单数: {{card.alternative}}</span>
                    </div>
                </div>
                <div class="info-tags f_l c_a" v-if="card.appraise&&card.appraise.length > 0">
                    <div v-for="(item ,index) in card.appraise" class="tag-item f_s"><span>{{item}}</span></div>
                </div>
            </div>
            <div class="column column2 f_s">
                <div class="column-li">
                    <div class="column-li-sub c_a">使用工期: </div>
                    <div class="column-li-sub">{{card.period}}</div>
                </div>
                <div class="column-li">
                    <div class="column-li-sub c_a" v-if="card.type=='1'">需要工人: </div>
                    <div class="column-li-sub c_a" v-if="card.type=='3'">需要物品: </div>
                    <div class="column-li-sub">
                        <span v-for="(val, index) in card.task">{{val.name}} X{{val.amount}}</span>
                    </div>
                </div>
                <div class="column-li" v-if="card.type!='3'">
                    <div class="column-li-sub c_a">预算金额: </div>
                    <div class="column-li-sub">
                        <span v-if="card.manner == '1'">预付30%</span>
                        <span v-if="card.manner == '0'">线上全款</span>
                        <span v-if="card.manner == '2'">线下支付</span>
                        <span class="tag-m f_l f_w c_t">¥ {{card.money}} </span>
                        <span>(总金额)</span>
                    </div>
                </div>
            </div>
            <div class="column column2 f_s br-tp">
                <div class="column-li">
                    <div class="column-li-sub c_a">订单编号: </div>
                    <div class="column-li-sub">
                        {{card.orderNumber}}
                        <i class="iconfont icon-dingdan" style="font-size: 15px"></i>
                    </div>
                </div>
                <div class="column-li">
                    <div class="column-li-sub c_a">发布时间: </div>
                    <div class="column-li-sub">{{card.orderNumber}}</div>
                </div>
                <div class="column-li" v-if="card.status=='7'">
                    <div class="column-li-sub c_a">完成时间: </div>
                    <div class="column-li-sub">{{card.finishTime}}</div>
                </div>
            </div>
            <div class="column column2 br-tp f_s" style="padding-top: 10px;padding-bottom: 10px;min-height:38px">
                <div class="flex-view">
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="handleOrder(card.id, 'compete')" 
                        v-if="card.status=='2'&&card.type!='3'&&card.isBuyIns == 1">
                    录入保险</div>
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="handleOrder(card.id, 'compete')" 
                        v-if="card.status=='2'">
                    申请取消</div> 
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="handleOrder(card.id, 'compete')" 
                        v-if="card.status=='4'">
                    完成</div>
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="handleOrder(card.id, 'compete')" 
                        v-if="card.status!='2'&&card.type!='3'&&card.isBuyIns == 1">
                    查看保险</div>
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="handleOrder(card.id, 'appraise')" 
                        v-if="card.status == '7'&&card.appraiseExists == '0'">
                    评价</div>
                    <div 
                        class="btn-g f_l pointer"
                        @click.stop="deleteOrder(card.id)" 
                        v-if="card.status == '7'&&card.appraiseExists == '1'">
                    删除</div>
                </div>
            </div>
        </div>
    </div>
    <div class="icons-top" v-if="scrollTop>=800" @click="toTop">
        <i class="iconfont icon-zhiding"></i>
    </div>
    <div class="over-box c_a" v-if="loadAll">
        没有了哦~~
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import Dialog from '../dialog/dialog'
import Paging from './paging.vue'
import Speech from '../api/speech'
import '../assets/css/order.css'
import eventBus from '../api/eventBus'
import { filter_title_status } from '../api/filter'
import { handlesuccess, handlemodal, handlenotice } from '../api/toast'
import { X_orderCancel, X_orderComplete, X_deleteCompleteOrder, X_ignoreOrder, X_grabOrder, X_getreedit } from '../api/xhr'
export default {
  props: ['data', 'page'],
  data () {
    return {
        speechAudio: new Speech(),
        nonexistence: false,
        translateWidth: 0,
        wrapHeight: 0,
        scrollTop: 0,

    }
  },

  computed: {
    ...mapGetters(['type', 'status', 'loadAll', 'isLoading'])
  },

  watch: {
     // type(newVal, oldVal){
     //    $('#wrap').animate({param1: value1, param2: value2}, 200)
     // }
  },

  mounted(){
     this.wrapHeight = $('#wrap').height()
     this.translateWidth = $('.column-slider').innerWidth()/4

     $('#wrap').bind('scroll', this.orderListScroll)
  },

  methods: {
    slider(index, slider, $event){
        const currentLeft = parseInt($($event.target).siblings('.column-slider').find('.column-imgs-box').css('left'))
        let sliderWidth = 0
        if(slider == 'left'){
            const sliderBoxWidth = $($event.target).siblings('.column-slider').innerWidth()
            const imgsBoxWidth = $($event.target).siblings('.column-slider').find('.column-imgs-box').innerWidth()
            if(imgsBoxWidth - sliderBoxWidth <= -currentLeft + 10) return
            sliderWidth = currentLeft - 128
        }
        if(slider == 'right'){
            if(currentLeft >= 0) return
            sliderWidth = currentLeft + 128
        }
        $($event.target).siblings('.column-slider').find('.column-imgs-box').animate({left: sliderWidth+'px',}, 400)
    },

    enter($event){
       $($event.target).find('.preview-icon').hide()
       
    },

    leave($event){
        $($event.target).find('.preview-icon').show()
    },

    speech(audio, $event){
        if($($event.target).hasClass('active')){
            this.speechAudio.pause()
            return
        }
        this.speechAudio.play(audio, $event.target)
    },

    imgevent(){
        console.log('lll')
    },

    handleOrder(id, handle){
        const that = this
        const params = { oid: id}
        switch(handle){
          case 'appraise':
            this.$store.dispatch('get_details', {id: id, route: '/index/appraisePage'})
            break;
          case 'complete':
            handlemodal('确定订单已完成？', '', this.handleComplete, params) 
            break;
          case 'delete':
            handlemodal('确定删除订单？', '', this.handleDelete, params) 
            break;
          case 'ignore':
            handlemodal('忽略后该订单将不可见，确认忽略？', '', this.handleIgnore, params) 
            break;
          case 'grab':
            X_grabOrder({oid: id}).then(res =>{
                handlesuccess('抢单成功', '请及时与对方联系，确保订单无误')
                that.$store.dispatch('get_details', {id: id, route: true})
            });
            break;
          case 'cancel':
            handlemodal('确定取消订单？', '', this.handleCancel, params)   
            break;
          default:
            break;
        }
    },

    reEdit(oid, type){
        const that = this
        this.$store.commit('WIPE_PARAMS')
        this.$store.commit('IS_REEDIT', true)
        this.$store.commit('SET_ORDER_TYPE', parseInt(type))
        this.$store.dispatch('get_second_level', parseInt(type))

        X_getreedit({oid: oid}).then(res=>{
            if(res.data.code == 10000){
                let originOrder = res.data.data.originOrder
                this.$store.commit('SELECT_WORK_TYPE', {
                    title: originOrder.task[0].name,
                    career_code: originOrder.careerCode,
                    workTypeCatg: originOrder.workTypeCatg,
                    id: originOrder.task[0].id,
                    high: originOrder.highEnable
                })
                this.$store.commit('SELECT_ADDRESS', {
                    locationLon: originOrder.locationLon,
                    locationLat: originOrder.locationLat,
                    locationdesc: originOrder.locationdesc,
                    province: originOrder.province,
                    city: originOrder.city,
                    district: originOrder.district
                })
                if(originOrder.type == '1'){
                    this.$store.commit('GET_TIME', {
                        id: parseInt(originOrder.type),
                        time: originOrder.startTime
                    })
                    that.$store.commit('SELECT_OTHER_INFO', {
                        img: originOrder.img,
                        memo: originOrder.memo,
                        manner: ''+originOrder.manner,
                        budget: ''+originOrder.budget,
                        prepay: ''+originOrder.prepay,
                        quantity: ''+originOrder.quantity,
                        workDays: ''+originOrder.workDays,
                        highAltitude: originOrder.highAltitude,
                        solutionCode: originOrder.solutionCode
                    })
                    this.$store.dispatch('get_insure_info', {type: originOrder.insuType, high: originOrder.highEnable})
                }
                if(originOrder.type == '3'){
                    this.$store.commit('GET_TIME', {
                        id: parseInt(originOrder.type),
                        time: [originOrder.startTime, originOrder.endTime]
                    })
                    this.$store.commit('SELECT_OTHER_INFO', {
                        img: originOrder.img,
                        memo: originOrder.memo,
                        task: originOrder.task
                    })
                }
                this.$router.push({path: '/index/release'})
            }
        })
    },

    directCancel(oid){
        const that = this
        new Dialog().init({
            title: '温馨提示',
            text: '订单取消后将不在周边订单显示，是否确定取消订单？',
            confirm: ()=>{
                X_orderCancel({oid: oid}).then(res => {
                    new Dialog().init({
                        showbtn: false,
                        title: '订单取消成功！',
                        icon: 'info',
                        hide: ()=>{
                            that.$store.dispatch('get_all_order', 1)
                        }
                    })
                })
            }
        })
    },

    completeOrder(oid){
        const that = this
        X_orderComplete({oid: oid}).then(res=> {
            new Dialog().init({
                showbtn: false,
                title: '操作成功！',
                icon: 'success',
                hide: ()=>{
                    this.$store.dispatch('get_details', {id: oid, route: '/index/appraisePage'})
                }
            })
        })
        
    },

    handleComplete(params){
        const that = this
        // const oid = this.details.orderInfo.oid
        X_orderComplete(params).then(res =>{
          handlesuccess('恭喜完成订单！', '系统奖励会发到您的账户')
        })
    },

    deleteOrder(oid){
        const that = this
        X_deleteCompleteOrder({oid: oid}).then(res =>{
            that.$store.dispatch('get_all_order', that.page)
            new Dialog().init({
                showbtn: false,
                title: '订单删除成功！',
                icon: 'info',
                hide: ()=>{
                }
            })
        })
    },

    handleIgnore(params){
        const that = this;
        X_ignoreOrder(params).then(res =>{
            that.$store.dispatch('get_all_order', that.page)
        })
    },

    orderListScroll(){
        if(this.loadAll||this.isLoading) return
        
        const that = this
        const scrollTop = $('#wrap').scrollTop()
        const listHeight = $('#list-box').height()
        that.scrollTop = scrollTop
        if(listHeight - scrollTop - that.wrapHeight <= 1){
            this.$store.commit('SET_LOADING_STATE')
            const page = that.page+1
            that.$emit('changePage', page)
            that.$store.dispatch('get_all_order', page)
        }
    },

    toTop(){
        $('#wrap').animate({scrollTop: 0+'px'}, 500)
        this.scrollTop = 0
    },
  },

  components: {
    'v-paging': Paging
  }
}
</script>

<style scoped>
#wrap{
    width: calc(100% - 150px);
    min-width: 540px;
    overflow-y: auto;
}
#list-box{
    width: 100%;
    height: auto;
}
.flex-alc{
  justify-content: flex-start;
}

.title{
    width: 100%;
    text-align: center;
    position: relative;
    color: #ff9900;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f6f6f6;
}
.title span{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    font-weight: normal;
}

.title.title-mine{
    text-align: right;
    color: #547aff;
    font-weight: normal;
    font-size: 14px;
    padding-right: 20px;
}
.icons-top{
    position: fixed;
    right: 5px;
    bottom: 65px;
    width: 36px;
    height: 36px;
    opacity: 0.6;
    text-align: center;
}
.icons-top .iconfont{
    font-size: 28px;
}
.icons-top:hover{
    opacity: 1
}
.empty{
  text-align: center;
  line-height: 30px;
  color: #aaa;
  font-size: 16px;
}
.empty img{
  width: 120px;
  height: 120px;
  margin: 30px auto 0;
  display: block;
}
.over-box{
    width: 100%;
    line-height: 32px;
    margin-top: 25px;
    text-align: center;
    margin-bottom: 20px;
}
</style>
