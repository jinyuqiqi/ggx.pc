import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueAMap from 'vue-amap'
import ElementUI from 'element-ui'
import preview from 'vue-photo-preview'
import service from './api/service'
import * as filters from './api/filter'
import './assets/css/style.css'
import 'vue-photo-preview/dist/skin.css'

Vue.use(VueAMap);
Vue.use(ElementUI);
Vue.use(preview, {fullscreenEl:false});

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}

Vue.config.productionTip = false;

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

VueAMap.initAMapApiLoader({
  key: 'd4332e5adb8b584442266763d20b978c',
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  v: '1.4.4'
});


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

