<template>
  <div class="wrap">
    <div>
        <h3 @click="addtags(1)">我的技能</h3>
        <span v-for="(item, index) in tags.man">{{item.title}}</span>
    </div>
    <div>
        <h3 @click="addtags(3)">我的物品</h3>
        <span v-for="(item, index) in tags.matter">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import eventBus from '../api/eventBus'
import { X_mytags } from '../api/xhr'
export default {
  data () {
    return {
      tags: {},
      typetags: null
    }
  },

  computed: {
    
  },

  created(){
    const that = this
    X_mytags().then(res =>{
        that.tags = res.data.data
    })
  },

  mounted(){

  },

  methods: {
    addtags(id){
        this.typetags = id == 1 ? this.tags.man : this.tags.matter
        // eventBus.$emit('getMytags', mytags)
        this.$router.push({path: '/index/addtags', query: {id: id}})
    }
  },

  beforeDestroy () {
    eventBus.$emit('getMytags', this.typetags)
  },

  destroyed: function () {

  },

  components: {
  }
}
</script>

<style scoped>
.wrap h3{
    background: #FFFFFF;
}
.wrap span{
    display: inline-block;
    padding: 5px;
    background: #38475d;
    color: #FFFFFF;
    margin: 3px;
}
</style>
