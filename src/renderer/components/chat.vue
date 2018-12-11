<template>
  <div class="chat-box" :style="{height: wheight+'px'}">
      <div class="dialog-box">
          <div class="dialog-item">
              <div class="d-time c_a f_s">11月21号 13:00</div>
              <div class="d-msg d-left flex-view">
                  <div class="d-msg-head">
                      <span class="f_s f_w">coco</span>
                      <img src="../assets/images/beauty.jpg" alt="">
                  </div>
                  <div class="d-msg-content c_b">
                     <p>房间爱不打飞机啊半岛国际is昂家撒不干净加深对公司咖啡撒即可功能就是加的桑拿加快速度科技三大哦啊是发到号为偶尔</p>
                  </div>
              </div>
              <div class="d-msg d-right flex-end">
                  <div class="d-msg-content b_m">
                      房间爱不打飞机啊半岛国际is昂家撒不干净加深对公司咖啡撒即可功能就是加的桑拿加快速度科技三大哦啊是发到号为偶尔
                  </div>
                  <div class="d-msg-head">
                      <span class="f_s f_w">scord</span>
                      <img src="../assets/images/handsome.jpg" alt="">
                  </div>
              </div>
              <div class="d-msg d-left flex-view">
                  <div class="d-msg-head">
                      <span class="f_s f_w">coco</span>
                      <img src="../assets/images/beauty.jpg" alt="">
                  </div>
                  <div class="d-msg-content c_b">
                     <p>房间爱不打飞机啊半岛国际is昂家撒不干净加深对公司咖啡撒即可功能就是加的桑拿加快速度科技三大哦啊是发到号为偶尔</p>
                  </div>
              </div>
              <div class="d-msg d-right flex-end">
                  <div class="d-msg-content b_m">
                      <div class="speech-msg flex-between" style="width: 40px">
                          <span>10″</span>
                          <i class="iconfont icon-yuyin1 icon-white"></i>
                      </div>
                  </div>
                  <div class="d-msg-head">
                      <span class="f_s f_w">我是还吃肉的小兔兔</span>
                      <img src="../assets/images/handsome.jpg" alt="">
                  </div>
              </div>
              <div class="d-msg d-left flex-view">
                  <div class="d-msg-head">
                      <span class="f_s f_w">coco</span>
                      <img src="../assets/images/beauty.jpg" alt="">
                  </div>
                  <div class="d-msg-content c_b">
                     <div class="speech-msg flex-between" style="width: 40px">
                          <i class="iconfont icon-yuyin icon-grey"></i>
                          <span>10″</span>
                      </div>
                  </div>
              </div>
              <div class="d-msg d-left flex-view">
                  <div class="d-msg-head">
                      <span class="f_s f_w">coco</span>
                      <img src="../assets/images/beauty.jpg" alt="">
                  </div>
                  <div class="d-msg-img c_b">
                       <img class="d-msg-img-item" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544072255115&di=a8ff33216a9e17d344b7f47a0c50352f&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201801%2F05%2F194657n66k6v368lhed67p.jpg" alt="">
                  </div>
              </div>
          </div>
      </div>
      <div class="input-box">
          <div class="msg-setting-box flex-view">
              <i class="iconfont icon-xiaolianzhengquekaixintongyiyuanxingchenggongxianxing c_m pointer"></i>
              <i class="iconfont icon-jianqie pointer"></i>
          </div>
          <div class="textarea-box">
              <textarea name="textvalue" id="text-box" cols="30" rows="10"></textarea>
          </div>
          <div class="send-btn c_a f_s">
              <label>Enter发送，Ctrl+Enter换行 </label>
              <span class="pointer" id="btn-send">发送</span>
          </div>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
import { AppKey } from '../api/config'
import eventBus from '../api/eventBus'
import { X_gettoken } from '../api/xhr'
import RongImInit from '../api/rongInit'
export default {
    props: ['wheight'],

    data() {
      return {
         
      }
    },

    computed: {
        ...mapGetters(['userInfo'])
    },

    created(){
       // this.RongIMInit()
       // RongImInit._Init()
    },

    mounted(){
        
    },

    methods: {
       // RongIMInit(){
       //      RongIMLib.RongIMClient.init(AppKey);
       //      RongIMClient.setConnectionStatusListener({
       //          onChanged: function (status) {
       //              switch (status) {
       //                  case RongIMLib.ConnectionStatus.CONNECTED:
       //                      console.log('链接成功');
       //                      break;
       //                  case RongIMLib.ConnectionStatus.CONNECTING:
       //                      console.log('正在链接');
       //                      break;
       //                  case RongIMLib.ConnectionStatus.DISCONNECTED:
       //                      console.log('断开连接');
       //                      break;
       //                  case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
       //                      console.log('其他设备登录');
       //                      break;
       //                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
       //                      console.log('域名不正确');
       //                      break;
       //                  case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
       //                    console.log('网络不可用');
       //                    break;
       //              }
       //          }
       //      });

       //   // 消息监听器
       //      RongIMClient.setOnReceiveMessageListener({
       //      // 接收到的消息
       //          onReceived: function (message) {
       //              // 判断消息类型
       //              switch(message.messageType){
       //                  case RongIMClient.MessageType.TextMessage:
       //                      // message.content.content => 消息内容
       //                      break;
       //                  case RongIMClient.MessageType.VoiceMessage:
       //                      // 对声音进行预加载                
       //                      // message.content.content 格式为 AMR 格式的 base64 码
       //                      break;
       //                  case RongIMClient.MessageType.ImageMessage:
       //                     // message.content.content => 图片缩略图 base64。
       //                     // message.content.imageUri => 原图 URL。
       //                     break;
       //                  case RongIMClient.MessageType.DiscussionNotificationMessage:
       //                     // message.content.extension => 讨论组中的人员。
       //                     break;
       //                  case RongIMClient.MessageType.LocationMessage:
       //                     // message.content.latiude => 纬度。
       //                     // message.content.longitude => 经度。
       //                     // message.content.content => 位置图片 base64。
       //                     break;
       //                  case RongIMClient.MessageType.RichContentMessage:
       //                     // message.content.content => 文本消息内容。
       //                     // message.content.imageUri => 图片 base64。
       //                     // message.content.url => 原图 URL。
       //                     break;
       //                  case RongIMClient.MessageType.InformationNotificationMessage:
       //                      // do something...
       //                     break;
       //                  case RongIMClient.MessageType.ContactNotificationMessage:
       //                      // do something...
       //                     break;
       //                  case RongIMClient.MessageType.ProfileNotificationMessage:
       //                      // do something...
       //                     break;
       //                  case RongIMClient.MessageType.CommandNotificationMessage:
       //                      // do something...
       //                     break;
       //                  case RongIMClient.MessageType.CommandMessage:
       //                      // do something...
       //                     break;
       //                  case RongIMClient.MessageType.UnknownMessage:
       //                      // do something...
       //                     break;
       //                  default:
       //                      // do something...
       //              }
       //          }
       //      });
       //      X_gettoken().then(res =>{
       //          console.log(res.data.data.token)
       //          RongIMClient.connect(res.data.data.token, {
       //              onSuccess: function(userId) {
       //                console.log("Connect successfully." + userId);
       //              },
       //              onTokenIncorrect: function() {
       //                console.log('token无效');
       //              },
       //              onError:function(errorCode){
       //                    var info = '';
       //                    switch (errorCode) {
       //                      case RongIMLib.ErrorCode.TIMEOUT:
       //                        info = '超时';
       //                        break;
       //                      case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
       //                        info = '不可接受的协议版本';
       //                        break;
       //                      case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
       //                        info = 'appkey不正确';
       //                        break;
       //                      case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
       //                        info = '服务器不可用';
       //                        break;
       //                    }
       //                    console.log(errorCode);
       //              }
       //          });
       //      })
       // }
    },
}
</script>

<style>
.chat-box{
    width: 100%;
    background: #FFFFFF;
}
.dialog-box{
    width: 100%;
    height: calc(100% - 138px);
    overflow: hidden;
    overflow-y: scroll;
    background: #F6F6F6;
    padding: 0 5px;
}
.dialog-item{
    width: 100%;
    padding: 0 2px;
    overflow: hidden;
}
.dialog-item .d-time{
    line-height: 24px;
    text-align: center;
}
.dialog-item .d-msg{
    margin-bottom: 18px;
}
.dialog-item .d-msg .d-msg-head{
    width: 50px;
    padding-top: 18px;
    text-align: center;
    position: relative;
}
.dialog-item .d-msg.d-left{
    padding-left: 10px;
}
.dialog-item .d-msg.d-right{
    padding-right: 10px;
}
.dialog-item .d-msg .d-msg-head img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
}
.dialog-item .d-msg .d-msg-content{
    max-width: calc(100% - 135px);
    margin-top: 20px;
    margin-left: 12px;
    background: #FFFFFF;
    border-radius: 2px;
    padding: 5px 12px;
    line-height: 18px;
}
.dialog-item .d-msg .d-msg-img{
    margin-top: 20px;
    margin-left: 12px;
    border: 1px solid #EBE8E8;
    border-radius: 2px;
}
.dialog-item .d-msg .d-msg-img img{
    max-width: 180px;
    height: auto;
}
.dialog-item .d-msg.d-right .d-msg-content{
    margin-left: 0;
    margin-right: 12px;
    color: #FFFFFF;
    background: #FF7E22
}
.dialog-item .d-msg .d-msg-content .speech-msg{
    height: 22px;
    line-height: 22px;
    align-items: center;
}
.dialog-item .d-msg .d-msg-content .speech-msg .iconfont{
    color: #FFFFFF;
    font-size: 12px;
    padding-top: 2px;
}
.dialog-item .d-msg.d-left .d-msg-content .speech-msg .iconfont{
    color: #333333
}
.dialog-item .d-msg .d-msg-head span{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    white-space: nowrap;
    max-width: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.input-box{
    height: 135px;
    margin: 0 5px;
    padding: 0 5px;
    border: 1px solid #C7C8D4;
}
.msg-setting-box{
    height: 20px;
    line-height: 20px;
}
.msg-setting-box .iconfont{
    font-size: 14px;
    margin: 0 5px;
    opacity: 0.8
}
.msg-setting-box .iconfont:hover{
    opacity: 1
}
.textarea-box textarea{
    width: 100%;
    height: 80px;
    border: none;
    outline: none;
}
.send-btn{
    line-height: 30px;
    text-align: right;
}
.send-btn span{
    display: inline-block;
    height: 24px;
    line-height: 24px;
    padding: 0 7px;
    font-size: 11px;
    border: 1px solid #C7C8D4;
    background: #F8F8F8;
    margin-left: 10px;
    border-radius: 1px;
    opacity: 0.8
}
.send-btn span.pointer:hover{
    opacity: 1
}
</style>

