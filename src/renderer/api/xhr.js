import Vue from 'vue'
import { api } from './config'
import service from './service'

const notoken = 0
const paytype = 1
let size = localStorage.getItem('size') ? localStorage.getItem('size') : 10

export const X_getAuthCode = params => {//获取短信验证码
    return service.POST(api.sendMsg, params, notoken)
}

export const X_login = params => {//登录
    return service.POST(api.login, params, notoken)
}

export const X_logout = params => {//退出登录
    return service.POST(api.logout, params)
}

export const X_userInfo = params => {//获取用户信息
    return service.POST(api.userInfo, params)
}

export const X_socket = params => {
    return service.POST(api.websocket, params)
}

export const X_allOrder = (type, params) => {
    return service.POST(api.allorders+type, params)
}

export const X_nearOrder = params => {//周边订单
    params['size'] = size
    return service.POST(api.nearbyOrder, params)
}

export const X_releasedOrder = params => {//我发的单
    params['size'] = size
    return service.POST(api.releasedOrder, params)
}

export const X_receivedOrder = params => {//我接的单
    params['size'] = size
    return service.POST(api.receivedOrder, params)
}

export const X_grabOrder = params => {//抢单
    return service.POST(api.grabOrder, params)
}

export const X_ignoreOrder = params => {//抢单
    return service.POST(api.ignoreOrder, params)
}


export const X_orderInfo = params => {//订单信息
    return service.POST(api.orderInfo, params)
}

export const X_orderComplete = params => {//完成订单
    return service.POST(api.orderComplete, params)
}

export const X_orderCancel = params => {//取消还未被接的单
    return service.POST(api.orderCancel, params)
}

export const X_orderApplyCancel = params => {//取消被接的单
    return service.POST(api.orderApplyCancel, params)
}

export const X_cancelReason = params => {//取消被接的单
    return service.POST(api.cancelReason, params, notoken)
}

export const X_goodsOrder = params => {//发布找物单
    return service.POST(api.goodsOrder, params)
}

export const X_peopleOrder = params => {//发布找人单
    return service.POST(api.peopleOrder, params)
}

export const X_orderConfigInfo = params => {//工种选择后返回订单配置相关信息
    return service.POST(api.orderConfigInfo, params)
}

export const X_deleteCompleteOrder = params => {//删除我接的订单（已结束）
    return service.POST(api.deleteCompleteOrder, params)
}

export const X_allLevel = (level, params) => {//
    return service.POST(api.allLevel+level, params)
}

export const X_secondLevel = params => {//二级找人找物类型菜单
    return service.POST(api.secondLevel, params)
}

export const X_thirdLevel = params => {//三级找人找物类型菜单
    return service.POST(api.thirdLevel, params)
}

export const X_message = params => {//消息
    return service.POST(api.message, params)
}

export const X_messageList = params => {//系统提示列表
    return service.POST(api.messageList, params)
}

export const X_activityList = params => {//活动公告列表
    return service.POST(api.activityList, params, notoken)
}

export const X_activityDetail = params => {//活动公告详情
    return service.POST(api.activityDetail, params)
}

export const X_appraise = params => {//评价页
    return service.POST(api.appraise, params)
}

export const X_getAppraise = params => {//获取评价页用户信息
    return service.POST(api.getAppraise, params)
}

export const X_wechatPay = params => {//获取评价页用户信息
    return service.POST(api.wechatPay, params)
}

export const X_currentstatus = params => {//获取评价页用户信息
    return service.POST(api.currentstatus, params)
}

export const X_setStatus = params => {//获取评价页用户信息
    return service.POST(api.setStatus, params)
}

export const X_setPageSize = (params) => {//获取评价页用户信息
    size = params
    localStorage.setItem('size', params.toString())
}

export const X_getcompany = params => {
    return service.POST(api.getcompany, params, notoken)
}

export const X_briefInfo = params => {
    return service.POST(api.briefInfo, params, notoken)
}

export const X_companyInfo = params => {
    return service.POST(api.companyInfo, params, notoken)
}

export const X_concatworker = params => {
    return service.POST(api.concatworker, params, notoken)
}

export const X_concatpay = params => {
    return service.POST(api.concatpay, params)
}

export const X_getadvcom = params => {
    return service.POST(api.getadvcom, params, notoken)
}

export const X_wxapplyconcat = params => {
    params['paytype'] = paytype
    return service.POST(api.wxapplyconcat, params, notoken)
}

export const X_grabbouns = params => {
    return service.POST(api.grabbouns, params)
}

export const X_mytags = params => {
    return service.POST(api.mytags, params)
}

export const X_gettaglist = params => {
    return service.POST(api.gettaglist, params, notoken)
}

export const X_addtags = params => {
    return service.POST(api.addtags, params)
}

export const X_gettoken = params => {
    return service.POST(api.gettoken, params)
}

export const X_getreedit = params => {
    return service.POST(api.getreedit, params)
}










