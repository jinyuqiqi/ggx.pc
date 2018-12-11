<template>
  <div class="orderbox wrap flex-view">
      <v-navbar></v-navbar>
      <v-list v-if="orders.length >=1" :data="orders" :page="page" @changePage="changePage"></v-list>
      <!-- <v-page @changePage="changePage" v-if="orders.length >=1"></v-page> -->

      <div v-if="isNoData" class="emptywrap">
        <img src="../assets/images/pic_jxw@2x.png" alt="">
        <div class="c_a">没有数据~~~</div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Page from '../components/paging.vue'
import Navbar from '../components/ordernavbar.vue'
import OrderList from '../components/orderlist.vue'
export default {
  data () {
    return {
      page: 1
    }
  },

  computed: {
    ...mapGetters(['orders', 'type', 'isNoData'])
  },

  created(){
     this.$store.dispatch('get_all_order')
  },

  methods: {
     changePage(page){
        this.page = page
     }
  },

  components: {
     'v-page': Page,
     'v-navbar': Navbar,
     'v-list': OrderList
  }
}
</script>

<style scoped>
.orderbox{
  width: 100%;
  /* height: calc(100% - 86px); */
}
.flexwrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.emptywrap{
  width: calc(100% - 150px);
  min-width: 540px;
  text-align: center;
}
.emptywrap img{
  width: 150px;
  height: 150px;
  margin: 80px auto 10px;
}
</style>
