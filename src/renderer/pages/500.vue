<template>
  <div class="wrap">
    <div class="errwrap">
      <div class="f_l c_t f_w">抱歉！ 服务器内部出现错误</div>
      <div><b @click="routeredict('back')" class="f_t c_m">重新操作</b>或<b @click="routeredict('index')" class="f_t c_m">返回首页</b></div>
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

  destroyed: function () {
    this.$destroy()
  },

  mounted(){
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
