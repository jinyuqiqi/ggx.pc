<template>
    <div class="mapWrap">
        <div id="temp" style="display:none"></div>
        <div class="search-box">
            <div class="input">
                <input type="text" v-model="value" @keyup="keyUpSearch" placeholder="请输入地址"/>
                <span v-if="key!=''" @click="cancel">取消</span>
                <button class="commit" @click="selectAddressBtn(item)">确认选择</button>  
            </div>
            <div class="list" v-if="list&&list.length > 0">
                <div class="item" @click="selectAddress(item)" v-for="(item, index) in list">{{item.name}}</div>
            </div>
        </div>
        <el-amap vid="amap" 
            :plugin="plugin" 
            :center="mapCenter" 
            :zoom="15" 
            class="amap-demo">
            <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
        </el-amap>
    </div>
</template>

<script>
import $ from 'jquery'
import { trim } from '../api/filter'
export default {
  data () {
    let that = this;
    return {
        markers: [{
            position: [121.59996, 31.197646],
        }],
        list: [],
        initItem: {},
        value: '',
        mapCenter: [121.59996, 31.197646],
        plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    console.log(result)
                    that.lng = result.position.lng;
                    that.lat = result.position.lat;
                    that.mapCenter = [that.lng, that.lat];
                    that.markers.position = [that.lng, that.lat];
                    that.value = result.formattedAddress
                    that.initItem = {
                        locationLon: result.position.lng,
                        locationLat: result.position.lat,
                        locationdesc: result.formattedAddress,
                        province: result.addressComponent.province,
                        city: result.addressComponent.city,
                        district: result.addressComponent.district
                    }
                    that.$nextTick();
                  }
                });
              }
            }
        }],
        
    };
  },

  watch:{
      
  },

  computed: {
    height(){
        let HomeHeight = parseInt($('.mapWrap').height()) - 10
        return HomeHeight
    },

    key(){
        return trim(this.value)
    }
  },

  created(){
    
  },

  mounted(){
    setTimeout(() => {
      this.placeSearch(this.value)
    }, 1000)
     
  },

  methods: {
    keyUpSearch() { 
        let key = this.key
        if(key == '') return
        this.placeSearch(key)
    },

    placeSearch(key){
        const that = this
        AMap.service(["AMap.PlaceSearch"], function() { 
            var placeSearch = new AMap.PlaceSearch({
                panel: 'temp'
            });
            placeSearch.search(key, function(status, result) {
                that.list = result.poiList.pois
            })
        })
    },

    cancel(){
        this.value = ''
        this.list = []
    },

    selectAddress(item){
        const addressInfo = {
            locationLon: item.location.lng.toString(),
            locationLat: item.location.lat.toString(),
            locationdesc: item.pname+item.cityname+item.adname+item.name,
            province: item.pname,
            city: item.cityname,
            district: item.adname
        }
        this.initItem = addressInfo
        this.$store.commit('SELECT_ADDRESS', addressInfo)
        this.$router.go(-1)
    },

    selectAddressBtn(){
        this.$store.commit('SELECT_ADDRESS', this.initItem)
        this.$router.go(-1)
    }
  }
}
</script>

<style>
.mapWrap{
    width: 100%;
    height: 100%;
    position: relative;
}
.mapWrap .search-box{
    width: 90%;
    height: 42px;
    position: absolute;
    top: 15px;
    left: 5%;
    z-index: 1000;
}
.mapWrap .search-box .input{
    opacity: 0.9;
    height: 42px;
    line-height: 42px;
}
.mapWrap .search-box .input span{
    position: absolute;
    top: 0;
    right: 81px;
    color: #999;
    display: block;
    padding: 0 5px;
    height: 42px;
    line-height: 42px;
}
.mapWrap .search-box .input input{
    width: 100%;
    padding: 0 12px;
    border: 1px solid #f1f1f1;
    background: #F8F8F8;
    height: 42px;
    line-height: 42px;
}
.mapWrap .search-box .input .commit{
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    outline: none;
    background: #409eff;
    color: #FFFFFF;
    width: 80px;
    height: 42px;
    line-height: 42px;
}
.mapWrap .search-box .list{
    background: #FFFFFF;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    line-height: 32px;
}
.mapWrap .search-box .list .item{
    border-bottom: 1px solid #eee;
    padding: 0 15px;
}
.mapWrap .search-box .list .item:hover{
    background: #ecf5ff;
    color: #409eff
}
.mapWrap .el-vue-amap-container, .mapWrap .el-vue-amap-container .el-vue-amap{
    height: 100%
}
.mapWrap .el-vue-search-box-container{
    width: 100%;
    min-width: 360px;
}
.mapWrap .el-vue-search-box-container .search-tips{
    width: 100%
}
.mapWrap .el-vue-search-box-container .search-box-wrapper{
    width: 100%;
    background: #F8F8F8
}
.mapWrap .el-vue-search-box-container .search-box-wrapper input{
    background: #F8F8F8
}
.mapWrap .el-vue-search-box-container .search-box-wrapper .search-btn{
    color: #FFFFFF;
    background: #409eff;
    width: 80px
}
</style>
