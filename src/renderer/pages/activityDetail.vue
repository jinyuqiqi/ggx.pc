<template>
    <div class="wrap">
        <!-- <v-nav-title :navtitle="navtitle"></v-nav-title> -->
        <p class="line"></p>
        <p class="title">{{data.title}}</p>
        <p class="time">{{data.created_at}}</p>
        <div class="img">
            <img :src="data.cover" alt="">
        </div>
        <div v-html="data.content" class="content">{{data.content}}</div>
    </div>
</template>

<script>
    import { X_activityDetail } from '../api/xhr'
    import NavTitle from '../components/secondpagenav.vue'
    export default {
        name: "activityDetail",
        components: {
            'v-nav-title': NavTitle
        },
        data(){
            return{
                url:'',
                id:'',//保存活动公告id
                data:{},
                navtitle: null
            }
        },
        created(){
            this.url = location.href;
            this.id = this.url.split("id=")[2]; //截取路径中第二个id值
            this.getactivityDEtail();
        },
        methods:{
            //获取数据
            getactivityDEtail(){
                const that = this
                const params = {
                    id:this.id
                };
                X_activityDetail(params).then(res =>{
                    if(res.data.code == 10000) {
                        this.data = res.data.data;
                        this.navtitle = res.data.data.title
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .line{
        height: 1px;
        width: 100%;
        background: #e0e0e0;
        margin-bottom: 5px;
        margin-top: 15px;
    }
    .img{
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
    }
    .img>img{
        width: 100%;
        height: auto;
    }
    .title{
        font-size: 18px;
        color: #333333;
    }
    .time{
        margin: 10px auto;
        font-size:16px;
        color: #999999;
    }
    .content{
        line-height: 28px;
        font-size: 14px;
        font-family: PingFang SC;
    }
</style>

