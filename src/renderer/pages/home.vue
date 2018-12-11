<template>
  <div class="wrap">
      <!-- <v-map :height="homeHeight"></v-map> -->
      <v-worker-dialog></v-worker-dialog>
      <keep-alive>
        <!-- <el-amap 
            class="map-box"
            vid="map"
            ref="map" 
            dragEnable="true">
        </el-amap> -->
      </keep-alive>
  </div>
</template>

<script>
import $ from 'jquery'
// import Maps from '../components/map.vue'
import WorkerDialog from '../components/workerdialog.vue'
export default {
  data () {
    return {
    }
  },

  created(){
  },

  computed: {
    homeHeight(){
      let HomeHeight = parseInt($('.wrap').height()) - 10
      return HomeHeight
    }
  },

  methods: {
    
  },

  mounted(){
    
  },

  destroyed(){
  },

  components: {
    // 'v-map': Maps,
    'v-worker-dialog': WorkerDialog
  }
}
</script>

<style scoped>

</style>
