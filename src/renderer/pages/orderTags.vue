<template>
  <div class="menuWrap">
     <!-- <v-nav-title :navtitle="mytitle"> -->
        <div class="sure f_s" slot="btn" @click="selectItem">确定</div>
     </v-nav-title>
     <div class="menus">
        <div class="menus-left">
           <div 
             class="item" 
             :class="mIndex == index ? 'active' : ''" 
             v-for="(item, index) in stairMenus" 
             @click="handleSelect(index, item)">
              <span>{{item.title}}</span>
           </div>
        </div>

        <div class="menus-right f_s" v-if="orderType == 1">
          <div 
            class="item" 
            v-for="(item, index) in secondMenus" 
            @click="routeBack(item)">
            <span>{{item.title}}</span>
          </div>
        </div>

        <div class="menus-right2 f_s" v-if="orderType == 3">
          <div 
             class="menus-right3" 
             v-for="(item, index) in secondMenus">
             <div class="f_m">{{item.title}}</div>
             <div class="menus-right-item">
                <div 
                  @click="select(val, index, idx)"
                  class="item" 
                  :class="val.type == 1 ? 'active' : ''"
                  v-for="(val, idx) in item.grandson">
                  <span>{{val.title}}</span>
                </div>
             </div> 
          </div>  
        </div>
     </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavTitle from '../components/secondpagenav.vue'
export default {
  data () {
    return {
      mIndex: 0,
      selectTag: []
    }
  },

  watch: {
    '$route': {
      handler: function(to, from){
        
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters(['stairMenus', 'secondMenus']),

    workTypeCatg(){
      return this.stairMenus
    },

    orderType(){
        return this.$store.state.order.ordertype
    },

    mytitle(){
      return this.$store.state.order.ordertype == 1 ? '选择工种' : '选择物品'
    }
  },

  created(){
  },

  mounted(){
  },

  methods: {
    handleSelect(index, item){
      this.mIndex = index
      this.$store.dispatch('get_third_level', item.id)
    },

    routeBack(item){
      let params = item
      params['workTypeCatg'] = this.stairMenus[this.mIndex].title
      this.$store.commit('SELECT_WORK_TYPE', params)
      this.$store.dispatch('get_insure_info', {type: params.type, high: params.high})
      this.$router.go(-1)
    },

    select(item, index, idx){
      let repeat = false
      let INDEX = -1
      this.selectTag.forEach((val, index) => {
        if(item.id == val.id){
           repeat = true
           INDEX = index
        }
      })
      if(repeat){
        this.selectTag.splice(INDEX, 1)
      }else{
        this.selectTag.push(item)
        this.$store.commit('SELECT_CLASS', {data: item, index: index, idx: idx, repeat: repeat})
      }
      
      
    },

    selectItem(){
      this.selectTag = []
      this.$store.commit('REMOVE_CLASS')
      this.$router.go(-1)
    }

  },

  components: {
    'v-nav-title': NavTitle
  }
}
</script>

<style scoped>
.menuWrap{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.menus{
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 8px;
    overflow: hidden; 
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-start;
}
.menus .menus-left{
  min-width: 200px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  /* width: 15%; */
  background: #FFF;
}
.menus .menus-left .item{
  text-align: center;
  position: relative;
  height: 54px; 
  border-left: 2px solid transparent
}
.menus .menus-left .item.active{
  background: #F2F2F2;
  border-left: 2px solid #ff9800
}
.menus .menus-right{
  min-width: 300px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  width: 80%;
  padding-left: 8px;
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
}
.menus .menus-right2{
   min-width: 300px;
   height: 100%;
   overflow: hidden;
   overflow-y: auto;
  /* width: 85%; */
   padding-left: 8px;
}
.menus .menus-right2 .f_m{
  line-height: 44px;
}
.menus .menus-right2 .menus-right3{
  margin-bottom: 10px
}
.menus .menus-right2 .menus-right-item{
   display: flex;
   justify-content: space-between;
   align-content: flex-start;
   flex-wrap: wrap;
}
.menus .menus-right2 .menus-right-item .active{
   color: #FFFFFF;
   background: #ff7e22
}
.menus .menus-right .menus-right-type{
  line-height: 32px;
  padding-left: 5px;
}
.menus .menus-right .item, .menus-right-item .item{
  margin-bottom: 8px;
  width: 150px;
  line-height: 18px;
  height: 70px;
  text-align: center;
  position: relative;
  background: #FFFFFF;
}
.menus .menus-left .item span,.menus .menus-right .item span, .menus-right-item .item span{
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
.sure{
  position: absolute;
  top: 0;
  right: 0;
  width: 42px;
  height: 100%;
}
</style>
