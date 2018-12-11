<template>
  <div class="navbar">
      {{navtitle}}<slot name="mark"></slot>
      <div class="back pointer" @click="back">
        <!-- <img src="../assets/images/arrow_bl.png" alt=""> -->
      </div>
      <slot name="btn"></slot>
  </div>
</template>

<script>
export default {
  props: ['navtitle'],

  data () {
    return {
      
    }
  },

  computed: {
  },

  created(){
  },

  mounted(){
    
  },

  methods: {
      back(){
          this.$router.go(-1)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
    background: #FFFFFF;
    width: 100%;
    height: 42px;
    line-height: 42px;
    text-align: center;
    position: relative;
    font-weight: bold;
}
.back{
  width: 42px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.back img{
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
}
</style>
