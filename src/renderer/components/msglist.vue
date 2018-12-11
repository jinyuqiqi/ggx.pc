<template>
    <div id="wrap">
        <div id="list-box">
            <div class="m-list f_l" v-if="msgtype == 0">
                <div class="m-list-item flex-view pointer" v-for="(item, index) in msgList">
                    <i class="iconfont icon-gonggao"></i>
                    <p class="list-content list-content1 c_t">{{item.content}}</p>
                    <div class="list-info flex-between">
                        <span class="c_m f_w f_m">{{item.title}}</span>
                        <span class="c_a f_s">{{item.created_at}}</span>
                    </div>
                </div>
            </div>

            <div class="m-list f_l" v-if="msgtype == 1">
                <div class="m-list-item m-list-item2 pointer" v-for="(item, index) in msgList">
                    <p class="list-content c_b f_w">{{item.content_brief}}</p>
                    <p class="list-content c_b f_w">{{item.title}}</p>
                    <div class="list-info">
                        <span class="c_a f_s">{{item.created_at}}</span>
                    </div>
                </div>
            </div>

            <v-chat :wheight="wrapHeight" v-if="msgtype == 2"></v-chat>
        </div>

        <div class="icons-top" v-if="scrollTop>=400" @click="toTop">
            <i class="iconfont icon-zhiding"></i>
        </div>

        <div v-if="isNoData" class="emptywrap">
            <img src="../assets/images/pic_jxw@2x.png" alt="">
            <div class="c_a">没有数据~~~</div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import eventBus from '../api/eventBus'
import Chatbox from '../components/chat.vue'
import  { X_messageList, X_activityList } from '../api/xhr'
export default {
  
  data () {
    return {
        msgList: [],
        msgtype: 0,
        page: 1,
        isLoading: false,
        isLoaded: false,
        scrollTop: 0,
        isNoData: false,
        wrapHeight: 0
    }
  },

  computed: {
    
  },

  watch: {
    
  },

  mounted(){
    const that = this
    that.wrapHeight = $('#wrap').height()
    that.getMsglist()
    eventBus.$on('getMsglist', function(msg){
        that.page = 1
        that.msgList = []
        that.msgtype = msg
        that.getMsglist()
    })
    $('#wrap').bind('scroll', this.listScroll)
  },

  methods: {
      getMsglist(){
        const that = this
        that.isNoData = false
        that.isLoaded = false
        if(that.msgtype == 0){
            X_messageList({page: that.page}).then(res =>{
                this.isLoading = false
                if(res.data.code == 10000) {
                    if(res.data.data.list.length < 20) that.isLoaded = true
                    if(that.page <= 1)that.msgList = res.data.data.list
                    if(that.page > 1) that.msgList = that.msgList.concat(res.data.data.list)
                    if(that.msgList.length <= 0) that.isNoData = true

                }
            })
        }
        if(that.msgtype == 1){
            X_activityList({page: that.page}).then(res =>{
                this.isLoading = false
                if(res.data.code == 10000) {
                    if(res.data.data.list.length < 20) that.isLoaded = true
                    if(that.page <= 1)that.msgList = res.data.data.list
                    if(that.page > 1) that.msgList = that.msgList.concat(res.data.data.list)
                    if(that.msgList.length <= 0) that.isNoData = true
                }
            })
        }
        
      },

      toTop(){
        $('#wrap').animate({scrollTop: 0+'px'}, 500)
      },

      listScroll(){
        if(this.isLoaded||this.isLoading) return
        // const wrapHeight = $('#wrap').height()
        const scrollTop = $('#wrap').scrollTop()
        const listHeight = $('#list-box').height()

        this.scrollTop = scrollTop
        if(listHeight - scrollTop - this.wrapHeight <= 1){
            this.isLoading = true
            this.page++
            this.getMsglist()
        }
      }
  },

  components: {
    'v-chat': Chatbox
  }
}
</script>

<style scoped>
#wrap{
    width: calc(100% - 150px);
    min-width: 540px;
    overflow-y: auto;
    position: relative;
}
#list-box{
    height: auto;
}
.m-list{
    padding: 5px 50px;
}
.m-list .m-list-item{
    background: #FFFFFF;  
    min-width: 500px;
    padding: 15px 125px 20px 40px;
    position: relative;
    border: 1px solid #E4E3E3;
    border-radius: 8px;
    flex-wrap: nowrap;
    margin-top: 20px;
}
.m-list .m-list-item.m-list-item2{
    padding-left: 50px
}
.m-list-item .iconfont{
    color: #FA914E;
    font-size: 12px;
    padding-top: 3px;
    margin-right: 13px;
}
.m-list .m-list-item:hover{
    background: #EAE8E8
}
.m-list .m-list-item .list-content{
    width: 340px;
    line-height: 18px;
    max-height: 36px;
}
.m-list .m-list-item .list-content1{
    display: -webkit-box;    
    -webkit-box-orient: vertical;    
    -webkit-line-clamp: 2;    
    overflow: hidden;
    position: relative;
}
.m-list .m-list-item.m-list-item2 .list-content{
    height: 18px;
    max-height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden
}
.m-list .m-list-item .list-info{
    width: 95px;
    position: absolute;
    top: 15px;
    right: 25px;
}
.m-list .m-list-item.m-list-item2 .list-info{
    text-align: right; 
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
.emptywrap{
  width: calc(100% - 150px);
  min-width: 540px;
  text-align: center;
}
.emptywrap img{
  width: 150px;
  height: 150px;
  margin: 80px auto 10px;
}
</style>
