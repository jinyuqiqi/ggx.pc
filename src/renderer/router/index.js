import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/login',
      component: (resolve) => require(['../pages/login.vue'], resolve)
    },{
      path: '/index',
      component: (resolve) => require(['../pages/index.vue'], resolve),
      children: [
        {
          path: 'home',
          component: Home,
        },{
          path: 'mine',
          component: (resolve) => require(['../pages/mine.vue'], resolve),
        },{
          path: 'orders',
          component: (resolve) => require(['../pages/orders.vue'], resolve),
        },{
          path: 'detail',
          component: (resolve) => require(['../pages/detail.vue'], resolve),
        },{
          path: 'messages',
          component: (resolve) => require(['../pages/messages.vue'], resolve),
        },{
          path: 'msgList',
          component: (resolve) => require(['../pages/msgList.vue'], resolve),
        },{
          path: 'mytags',
          component: (resolve) => require(['../pages/mytags.vue'], resolve),
        },{
          path: 'addtags',
          component: (resolve) => require(['../pages/addtags.vue'], resolve),
        },{
          path:'activityList',
          component: (resolve) => require(['../pages/activityList.vue'], resolve),
        },{
          path: 'activityDetail',
          component: (resolve) => require(['../pages/activityDetail.vue'], resolve),
        },{
          path: 'appraisePage',
          component: (resolve) => require(['../pages/appraisePage.vue'], resolve),
        },{
          path: 'orderTags',
          component: (resolve) => require(['../pages/orderTags.vue'], resolve),
        },{
          path: 'release',
          component: (resolve) => require(['../pages/release.vue'], resolve),
        },{
          path: 'address',
          component: (resolve) => require(['../pages/address.vue'], resolve),
        },{
          path: 'cancel',
          component: (resolve) => require(['../pages/cancel.vue'], resolve),
        },{
          path: 'close',
          component: (resolve) => require(['../pages/closepage.vue'], resolve),
        },{
          path: '404',
          component: (resolve) => require(['../pages/404.vue'], resolve),
        },{
          path: '500',
          component: (resolve) => require(['../pages/500.vue'], resolve),
        },{
          path: '503',
          component: (resolve) => require(['../pages/503.vue'], resolve),
        },{
          path: 'nonetwork',
          component: (resolve) => require(['../pages/nonetwork.vue'], resolve),
        },
        {path:'/', redirect: 'home'} 
      ]
    },
    {path:'/', redirect: '/index'} 
  ]
})
