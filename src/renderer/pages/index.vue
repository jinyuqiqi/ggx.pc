<template>
  <div class="container">
      <v-dialog></v-dialog>
      <div class="asideWrap">
          <v-aside></v-aside>
      </div>
      <div id="rightWrap" class="contentWrap">
          <v-user></v-user>
          <v-frame></v-frame>
          <router-view/>
          <v-release></v-release>
      </div>
      <!-- <v-map :height="homeHeight"></v-map> -->
  </div>
</template>

<script>
import '../assets/css/order.css'
import socket from '../api/websocket'
import Aside from '../components/aside.vue'
import User from '../components/usercard.vue'
import Frame from '../components/framebtn.vue'
import Dialog from '../components/orderdialog.vue'
import Release from '../components/releasebtn.vue'

export default {
  data () {
    return {
      
    }
  },

  computed: {
    
  },

  mounted(){
    socket()
    
  },

  methods: {
   
  },

  components: {
    'v-user': User,
    'v-aside': Aside,
    'v-frame': Frame,
    'v-dialog': Dialog,
    'v-release': Release
  }
}
</script>

<style scoped>

</style>
