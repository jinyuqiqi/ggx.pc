<template>
  <div class="wrap" style="height: 48px;padding-top: 5px">
    <el-pagination
      background
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="sizeArr"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { X_setPageSize } from '../api/xhr'
import 'element-ui/lib/theme-chalk/index.css'
export default {
    data() {
      return {
        currentPage: 1,
        size: 10,
        sizeArr: [10, 20, 30, 40]
      };
    },

    computed: {
      ...mapGetters(['total'])
    
    },

    created(){
      this.size = localStorage.getItem('size') ? parseInt(localStorage.getItem('size')) : 10
    },

    methods: {
      handleSizeChange(size) {
        this.size = size
        X_setPageSize(size)
      },

      handleCurrentChange(page) {
        this.currentPage = page
        this.$emit('changePage', page);
        this.$store.dispatch('get_all_order', page)
      }
    },
}
</script>

<style scoped>
    .el-pagination__total{
      height: 28px;
      line-height: 28px
    }
</style>

