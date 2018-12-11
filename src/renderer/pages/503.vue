<template>
  <div class="wrap">
    <div class="errwrap">
      <img src="../assets/images/payload.png" alt=""/>
      <div>服务器超负荷，维护中,建议稍后一会在操作<b @click="routeredict('back')" class="f_t c_m">返回</b>还是<b @click="routeredict('index')" class="f_t c_m">首页</b></div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },

  computed: {
    
  },

  methods: {
    routeredict(path){
      if(path == 'back'){
        this.$router.go(-1)
      }else{
        this.$router.push({ path: '/index'})
      }
    }
  },

  mounted(){
  },

  destroyed: function () {
    this.$destroy()
  },

  components: {
  }
}
</script>

<style scoped>
.errwrap{
   position: absolute;
   top: 120px;
   left: 50%;
   text-align: center;
   transform: translateX(-50%)
}
.errwrap img{
  width: 150px;
  height: 150px;
  margin: 0 auto 10px;
}
.errwrap b{
  cursor: pointer;
}
</style>
