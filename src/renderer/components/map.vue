<template> 
     <el-amap 
        class="map-box"
        vid="map"
        ref="map" 
        dragEnable="true"
        :zoom="zoom"
        :center="center" 
        :plugin="plugin"
        :events="events"
        :amap-manager="amapManager">
        <!--  <el-amap-marker vid="marker" 
          :position="center">
        </el-amap-marker>
        <el-amap-circle  

        

            vid="circle"
            :center="center" 
            :radius="radius" 
            fill-opacity="0.2"
            strokeColor="#38f"
            strokeOpacity="0.8"
            strokeWeight="1"
            fillColor="#38f">
        </el-amap-circle>
        <div class="icons-tog">
            <div @click="handleShowType(1)">
               <img v-if="showType == '2'||showType == '1'" src="../assets/images/icon_home_people_open@3x.png" alt="">
               <img v-else src="../assets/images/icon_home_people_close@3x.png" alt="">
            </div>
            <div @click="handleShowType(0)">
               <img v-if="showType == '2'||showType == '0'" src="../assets/images/icom_home_company_open@3x.png" alt="">
               <img v-else src="../assets/images/icom_home_company_close@3x.png" alt="">
            </div>
        </div> -->
    </el-amap>

</template>

<script>
import $ from 'jquery'
import eventBus from '../api/eventBus'
import getdistance from '../api/getdistance'
import {
    X_getcompany, 
    X_briefInfo, 
    X_companyInfo, 
    X_concatworker, 
    X_concatpay, 
    X_getadvcom, 
    X_grabbouns,
    X_wxapplyconcat
} from '../api/xhr'
import {AMapManager} from "vue-amap"
// import '../assets/css/amap.css'
let amapManager = new AMapManager()
let staicmap = new Map()
let staicmapcopy = new Map()
let movemap = new Map()
export default {
  props: ['height'],

  data () {
    const that = this;
    return {
      iconCom: require('../assets/images/pic_home_ptgs@2x.png'),
      iconWorker: require('../assets/images/icon_worker.png'),
      iconAdvCom: require('../assets/images/icon_dailishang.png'),
      iconBouns: require('../assets/images/pic_home_userhb@3x.png'),
      ishttping: false,
      mycity: null,
      amapManager,
      zoom:16,
      center: [121.406051,31.179695],
      radius: 50,
      zIndex: 101,
      markers: [],
      centermarker: null,
      showType: '3',
      events: {},
      distance: null,
      myUid: localStorage.getItem('uid').toString(),
      plugin: [
        // { pName: 'ToolBar', position: 'LT',},
        // { pName: 'OverView'},
        // { 
        //   pName:'Scale',
        //   events: {
        //     init(instance) {
        //     }
        //   }
        // },
        {
          pName:'Geolocation',//定位插件
          showMarker:false,
          events:{
            init(o){
              o.getCurrentPosition((status, result) => {
                that.mycity = result.addressComponent.city
                that.center = [result.position.lng, result.position.lat]
                that.loaded = true
                that.$nextTick()
              });
            }
          }
        }
      ]
    };
  },

  computed: {
   
  },

  created(){
    
  },

  mounted(){
    const that = this;
    const showType = localStorage.getItem('showType')
    this.showType = showType ? showType : this.showType
    // this.events = {
    //     'moveend': (e) => {
    //         that.handleMap('move')
            
    //     },
    //     'zoomend': (e) => {
    //         that.handleMap('scale')
            
    //     },
    // }
  },

  methods: {
    handleShowType(id){
        const that = this
        let showType = null

        if((id==1&&this.showType=='2')||(id==0&&this.showType=='3')) showType = '0';
        if((id==1&&this.showType=='3')||(id==0&&this.showType=='2')) showType = '1';
        if((id==1&&this.showType=='0')||(id==0&&this.showType=='1')) showType = '2';
        if((id==1&&this.showType=='1')||(id==0&&this.showType=='0')) showType = '3';
        that.showType = showType
        localStorage.setItem('showType', showType)
        if(showType == '3') {that.deleteMarker(null, 'all')}
        if(showType == '1') {that.deleteMarker(null, 'c')}
        if(showType == '0') {that.deleteMarker(null, 'w')}
    },

    handleMap(type){
        const that = this
        const zoom = that.amapManager.getMap().getZoom()
        const showType = that.showType
        if(showType == '3') return
        if(zoom <= 12) {
            const myAmap = that.amapManager.getMap();
            const markersroup = that.amapManager.getMap().getAllOverlays('marker')
            staicmap.clear()
            myAmap.remove(markersroup);
            return
        }
        if(that.ishttping) return
        const mapcenter = that.amapManager.getMap().getCenter()
        if(type == 'move'&&that.centermarker!=null){
            let translate = getdistance(mapcenter.lng, mapcenter.lat, that.centermarker[0], that.centermarker[1])
            if(translate <= 0.2) return
        }
        that.centermarker = [mapcenter.lng, mapcenter.lat]
        const corner = that.amapManager.getMap().getBounds()

        if(that.mycity!=null&&showType != '1'){
            const params = {
                left_top_lat: corner.Gb.lat,
                left_top_lng: corner.Gb.lng,
                right_bottom_lat: corner.Jb.lat,
                right_bottom_lng: corner.Jb.lng,
                city: that.mycity
            }
            that.getAdvcompany(params)
        }
        let distance = parseInt(getdistance(corner.Gb.lng, corner.Gb.lat, corner.Jb.lng, corner.Jb.lat)/2)
        if(distance == 0) distance = 1
        const params = {
            locationLon: mapcenter.lng,
            locationLat: mapcenter.lat,
            distance: distance,
            type: showType
        }
        that.getCompany(params)
    },

    getCompany(params){
        const that = this
        that.ishttping = true
        X_getcompany(params).then(res => {
            that.ishttping = false
            if(res.data.code == 10000){
                const data = res.data.data
                staicmapcopy.clear()
                if(data.list&&data.list.length>0){
                    that.mergeData('c', data.list)
                }

                if(data.userList&&data.userList.length>0){
                    that.mergeData('w', data.userList)
                }
            }
            
        })
    },

    getAdvcompany(params){
        const that = this
        X_getadvcom(params).then(res => {
            if(res.data.code == 10000){
                [...movemap.keys()].forEach((item) => {
                  that.deleteMarker(item)
                })
                movemap.clear()
                
                if(res.data.data.list.length >= 0){
                    res.data.data.list.forEach((item) => {
                      let vid = 'a'+item.id
                      let label = item.title == '' ? '未编辑' : item.title
                      movemap.set(vid, item)
                      that.setMarker(vid, item, label)
                    })
                    
                }
            }
        })
    },

    mergeData(type, dataArr){
        const that = this
        dataArr.forEach((item) => {
          let vid = type+''+item.id+''
          staicmapcopy.set(vid, item)
          if([...staicmap.keys()].length > 0){
            [...staicmap.keys()].forEach((item) => {
                if(!staicmapcopy.has(item)){
                    staicmap.delete(item)
                    that.deleteMarker(item)
                }
            })
          }
          if(!staicmap.has(vid)){
            let marklabel = ''
            let icontype = ''
            let company = ''
            if(type == 'c') {
                company = item.company
                icontype = item.icontype
                marklabel = item.title == '' ? '未编辑' : item.title
            }
            if(type == 'w') {
                marklabel = item.majorBusiness == '' ? '未编辑' : item.majorBusiness
            }
            staicmap.set(vid, item)
            that.setMarker(vid, item, marklabel) 
          }
        })
    },

    deleteMarker(vid, type=null){
        const that = this
        let markersroup = that.amapManager.getMap().getAllOverlays('marker')
        if(type=='all'){
            const myAmap = that.amapManager.getMap();
            const markersroup = that.amapManager.getMap().getAllOverlays('marker')
            staicmap.clear()
            myAmap.remove(markersroup);
            return
        }
        if(type=='w'){
            markersroup.forEach((item, index) => {
               if(item.Uh.vid.includes('w')) {
                    staicmap.delete(item.Uh.vid)
                    markersroup[index].setMap(null)
               }
            })
            return
        }
        if(type=='c'){
            markersroup.forEach((item, index) => {
               if(item.Uh.vid.includes('c')) {
                  staicmap.delete(item.Uh.vid)
                  markersroup[index].setMap(null)
               }
               if(item.Uh.vid.includes('a')) {
                  movemap.delete(item.Uh.vid)
                  markersroup[index].setMap(null)
               }
            })
            return
        }
        let index = markersroup.findIndex(function(value) {
          return value.Uh.vid == vid;
        })
        if(index <= -1) return
        markersroup[index].setMap(null)
    },

    setMarker(vid, item, label){
        const that = this
        let o = that.amapManager.getMap();
        let icon = null
        let isMine = false
        if(vid&&vid.includes('w')){
            if(vid.substring(1) == that.myUid){
                isMine = true
                icon = new AMap.Icon({
                    size: new AMap.Size(36, 36),    
                    image: that.iconWorker,  
                    imageSize: new AMap.Size(36, 36),
                }); 
            }else{
                icon = new AMap.Icon({
                    size: new AMap.Size(36, 36),    
                    image: that.iconWorker,  
                    imageSize: new AMap.Size(28, 28),
                });
            }
        }
        if(vid&&vid.includes('c')){
            icon = new AMap.Icon({
                size: new AMap.Size(36, 36),    
                image: that.iconCom,  
                imageSize: new AMap.Size(32, 32),
            });
        }
        if(vid&&vid.includes('a')){
            icon = new AMap.Icon({
                size: new AMap.Size(36, 36),    
                image: that.iconAdvCom,  
                imageSize: new AMap.Size(35, 35),
            });
        }
        if(item.gid > 0){
            icon = new AMap.Icon({
                size: new AMap.Size(36, 36),    
                image: that.iconBouns,  
                imageSize: new AMap.Size(35, 35),
            });
        }
        let marker = new AMap.Marker({
            vid: vid,
            position: [item.locationLon, item.locationLat],
            icon: icon,
            zIndex: isMine ? 101 : 100
        });
        if(vid.includes('a')){
            marker.setLabel({
                offset: new AMap.Pixel(0, -25),
                content: `<div class='info adv-info'>
                            <b>推广</b>
                            <span>${label}</span>
                        </div>`
            });
        }
        if(!vid.includes('a')){
            marker.setLabel({
                offset: new AMap.Pixel(0, -30),
                content: `<div class='info'>${label}</div>`
            });
        }
        marker.on('click', (e) => {
            const vid = e.target.Uh.vid
            if(item.gid > 0){
                X_grabbouns({id: item.gid}).then(res =>{
                    console.log(res)
                })
                return
            }

            if(vid.includes('w')){
                X_briefInfo({uid: vid.substring(1)}).then(res => {
                    if(res.data.code == 10000){
                        eventBus.$emit('getWorkerInfo', res.data.data)
                    }
                })
            } else {
                X_companyInfo({id: vid.substring(1)}).then(res => {
                    if(res.data.code == 10000){
                        eventBus.$emit('getWorkerInfo', res.data.data)
                    }
                })
            }
        })
        
        marker.setMap(o);
    },

  },

  destroyed(){
    this.plugin = null
    $('.map-box').remove()
    console.log($('.map-box'))
  }
}
</script>

<style>
.amap-marker-label{
    border: 0;
    background-color: transparent;
    transform: translateX(-25%);
    padding: 0;
}
.amap-marker-label .info{
    width: 100%;
    box-sizing: border-box;
    position: relative;
    top: 0;
    right: 0;
    min-width: 0;
    padding: 5px;
    font-size: 10px;
    color: #000000;
    margin: 0;
    white-space: wrap;
    background: #FFFFFF;
    box-shadow: 2px 2px 2px #bbb;
    border-radius: 2px;
}
.amap-marker-label .info.adv-info{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
}
.amap-marker-label .info.adv-info b{
    background: #ff7e22;
    color: #FFFFFF;
    font-size: 8px;
    word-wrap: break-word;
    text-align: center;
    padding: 5px 2px;
    border-radius: 2px;
    white-space: wrap;
    margin-right: 3px;
}
.amap-marker-label .info.adv-info span{
    padding: 0 3px;
}
.amap-marker-label .info.active{
    max-width: 250px;
    overflow: hidden;
    padding: 10px;
    /* left: 50%; */
    transform: translateX(-20%);
    top: -30px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.amap-marker-label .info.active h5{
    font-size: 12px;
    color: #ff7e22;
    padding-bottom: 10px;
    text-align: center;
}
.amap-marker-label .info.active span{
    color: #000000;
}
.amap-logo{
    display: none
}
.icons-tog{
  position: absolute;
  top: 10%;
  right: 10px;
  background: #FFFFFF;
}
.icons-tog div{
  padding: 8px;
}
.icons-tog div:first-child{
  border-bottom: 1px solid #EEEEEE;
}
.icons-tog div img{
  width: 24px;
  height: 24px;
  display: block;
  padding: 0;
  margin: 0;
}
</style>
