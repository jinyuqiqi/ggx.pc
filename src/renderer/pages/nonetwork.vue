<template>
  <div class="wrap">
    <img src="../assets/images/pic_artwork@2x.png" alt="" />
    <div class="errwrap">
      <div class="f_l c_t f_w">您的网络连接好像有问题!</div>
      <div>请<b @click="reload" class="f_t c_m">刷新</b>试试</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },

  watch: {
    
  },

  methods: {
    reload(){
        if(navigator.onLine){
            this.$router.go(-1)
        }
    }
  },

  destroyed: function () {
    this.$destroy()
  },
}
</script>


<style scoped>
.wrap img{
    width: 120px;
    height: 120px;
    display: block;
    margin: 100px auto 20px;
}
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
