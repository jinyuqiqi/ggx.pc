<template>
   <div class="wrap">
       <!-- <v-nav-title :navtitle="navtitle"></v-nav-title> -->
       <div class="scrollY">
           <div class="activity-list"
                v-for="(item, index) in list" :key="index" v-if="list.length"
                @click="toActivityDetail(item.url)">
               <p class="addTime">{{item.created_at}}</p>
               <div class="content-box">
                   <div class="left-img">
                       <img :src="item.cover" alt="">
                   </div>
                   <p class="content-text" v-html="item.content"></p>
               </div>
           </div>
           <div v-if="list.length ==0" class="noData">
               <img src="../assets/images/kong.png" alt="">
               <p>没有公告！<br/>听说用广告侠工作的人都赚了一个亿啦
                   爱信不信，反正没有公告</p>
           </div>
       </div>
   </div>
</template>
<script>
    import { X_activityList } from '../api/xhr'
    import NavTitle from '../components/secondpagenav.vue'
    export default {
        name: "activityList",
        components: {
            'v-nav-title': NavTitle
        },
        data(){
            return{
                page:1,
                size:10,
                list:[],
                navtitle: '活动公告'
            }
        },
        created(){
            this.getactivityList();
        },
        methods:{
            //获取数据
            getactivityList(){
                const params = {
                    page: this.page,
                    size: this.size
                };
                X_activityList(params).then(res =>{
                    if(res.data.code == 10000) {
                        this.list = res.data.data.list;
                        // console.log(this.list);
                    }
                })
            },
            //跳转活动公告详情页
            toActivityDetail(acivityId){
                this.$router.push({path: '/index/activityDetail?id='+acivityId})
            }
        }

    }

</script>

<style scoped>

.activity-list{
   width: 100%;
}
.addTime{
    width: 100%;
    text-align: center;
    line-height: 50px;
    color: #333333;
}
.content-box{
    background: #FFFFFF;
    width: 100%;
    border-radius: 15px;
    padding: 30px 10px 30px 30px;
}
.left-img{
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-right: 10px;
}
.left-img>img{
    max-width: 100%;
}

.content-text{
    line-height: 25px;
}

.noData{
    margin: 50px auto;
    text-align: center;
    line-height: 30px;
}
.noData>img{
    width: 100px;
    height: 100px;

}
</style>
