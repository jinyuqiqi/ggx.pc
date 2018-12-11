<template>
    <div class="wrap">
        <!-- <v-nav-title :navtitle="navtitle"></v-nav-title> -->
        <div class="scrollY">
            <div class="msg-list" v-for="(item,index) in list" :key="index" v-if="list.length">
                <div class="msg-time">{{item.created_at}}</div>
                <div class="msg-list-item">
                    <div class="msg-icon">
                        <img src="../assets/images/ggxlogo.png">
                    </div>
                    <div class="msg-text">
                        <div class="msg-text-source">
                            <div class="msg-type">{{item.title}}</div>
                        </div>
                        <div class="msg-text-explain">
                            <div class="msg-body">{{item.content}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!--没有数据显示模版-->
            <div v-if="list.length ==0" class="noData">
                <img src="../assets/images/kong.png" alt="">
                <p>没有通知喔～<br/>听说用广告侠工作的人都赚了一个亿啦
                    爱信不信，反正没有公告</p>
            </div>
            <infinite-loading :on-infinite="getListData" ref="infiniteLoading">
                <span slot="no-more">没有更多消息了</span>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
    import '../assets/css/message.css'
    import { X_messageList } from '../api/xhr'
    import NavTitle from '../components/secondpagenav.vue'
    import InfiniteLoading from 'vue-infinite-loading';//引入加载更多组件

    export default {
        name: 'msgList',
        components: {
            'v-nav-title': NavTitle,
            InfiniteLoading,
        },
        data () {
            return {
                page:1,
                size:20,
                list:[],
                navtitle: '系统提示',
            }
        },
        created(){
        },
        methods: {
            //获取数据
            getListData(){
                const params = {
                    page: this.page,
                    size: this.size
                };
                X_messageList(params).then(res =>{
                    if(res.data.code == 10000) {
                        
                        if (res.data.data.list) {
                            this.page++;
                            this.list = this.list.concat(res.data.data.list);
                            if (this.list.length === 20) {
                                this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                            } else {
                                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                            }
                        } else {
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                        }
                    } else {
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }
                }).catch(err=>{
                })
            }
        }
    }
</script>

<style scoped>
    .msg-list-item{
        border-radius: 15px;
    }
    .msg-time{
        text-align: center;
        line-height: 50px;
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
