
// export const ROOT_URL = 'https://api.guanggaoxia.cn/api/v3/'; //正式
// export const SOCKET_URL = 'wss://ws.guanggaoxia.cn/ws';           //正式环境
// export const SOCKET_INIT_URL = 'https://api.guanggaoxia.cn/api/v3/user/bindWs' //正式


export const ROOT_URL = 'http://t.guanggaoxia.cn:8091/api/v3/'; //测试
export const SOCKET_URL = 'wss://wsv1.guanggaoxia.cn/ws';//测试
export const SOCKET_INIT_URL = 'http://t.guanggaoxia.cn:8091/api/v3/user/bindWs'; //测试

export const AppKey = 'mgb7ka1nm4kig'

export const api = {
    login: 'user/login',
    logout: 'user/loginOut',
    sendMsg: 'user/sendSMS',
    userInfo: 'user/userInfo',
    allorders: 'order/',
    websocket: 'user/bindWs',
    nearbyOrder: 'order/nearbyOrders',
    releasedOrder: 'order/releasedOrders',
    receivedOrder: 'order/receivedOrders',
    grabOrder: 'order/grabOrder',
    orderInfo: 'order/orderInfo',
    orderComplete: 'order/orderComplete',
    orderCancel: 'order/orderCancel', //取消还未被接的单
    orderApplyCancel: 'order/orderApplyCancel', //取消已被接的单
    cancelReason: 'order/orderCancelReasons',
    ignoreOrder: 'order/ignoreOrder', //忽略周边订单
    goodsOrder: 'order/addGoodsOrder', //发布找物单
    peopleOrder: 'order/addPeopleOrder', //发布找人单
    orderConfigInfo: 'order/orderConfigInfo', //工种选择后返回订单配置相关信息
    deleteCompleteOrder: 'order/deleteCompleteOrder', //删除我接的订单（已结束）
    allLevel: 'tag/',
    secondLevel: 'tag/typeSecond',                 //二级找人找物类型菜单
    thirdLevel: 'tag/typeThird',                    //三级找人找物类型菜单
    message:'message/messageList',                    //消息
    messageList:'message/systemMessage',             //系统提示列表
    activityList:'message/noticeMessage',           //活动公告列表
    activityDetail:'message/noticeDetail',            //活动公告详情
    appraise:'order/orderAppraise',                //提交评价
    getAppraise:'order/orderAppraiseTags',         //获取评价
    wechatPay: 'order/wechatPaymentQrcode',         //微信支付二维码,
    currentstatus: 'user/currentStatus',
    setStatus: 'user/setOrderTaking',              //设置接单状态
    getcompany: 'user/getCompany',                 //获取周边公司工人
    briefInfo: 'user/briefInfo',                    //获取弹框工人信息
    concatworker: 'user/workerContactRousePay',    //联系工人获取支付信息
    concatpay: 'user/workerContactBalancePay',     //联系工人余额支付
    wxapplyconcat: 'user/workerContactRousePay',
    getadvcom: 'user/getAdvCompany',                //获取周边推广公司
    companyInfo: 'user/companyInfo',               //获取弹框公司信息
    grabbouns: '/generalize/bonus',                  //领取红包
    mytags: '/tag/getSpeciality',                     //我的标签
    gettaglist: '/tag/typeList',    
    addtags: 'tag/addSpeciality',                   //添加标签    
    gettoken: '/rongcloud/getToken',                 //获取用户融云通讯token   
    getreedit: 'order/originOrder',                   //重新编辑       
};
export const resCode = {
    success: 10000,
    failure: 20000,
    incomplete: 30001, //参数不完整
    inexistence: 30002, //用户不存在
    tokenerr: 30003,
    tokenpast: 30004,
    notbound: 30005
};

export const audio = {
    orderRemain: 'https://img.guanggaoxia.cn/AppMusic/20180516/535d394bf075f9b95d840ca9aafb1b48.mp3', //来单提醒
    restMode: 'http://cdn.adquan.net/app/music/rest.mp3', //休息模式
    orderMode: 'http://cdn.adquan.net/app/music/getorder.mp3', //接单模式
    listenMode: 'http://cdn.adquan.net/app/music/listenorder.mp3', //听单模式
}
