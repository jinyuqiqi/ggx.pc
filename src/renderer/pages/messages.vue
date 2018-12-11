<template>
    <div class="orderbox wrap flex-view">
        <v-navbar></v-navbar>
        <v-list></v-list>
    </div>
</template>
<script>
import '../assets/css/message.css'
import { X_message } from '../api/xhr'
import MsgList from '../components/msglist.vue'
import MsgNavBar from '../components/msgnavbar.vue'

export default {
    // name: 'messageList',
    data () {
        return {
            
        }
    },
    created(){

    },

    methods: {
        
    },

    components: {
        'v-list': MsgList,
        'v-navbar': MsgNavBar
    }
}
</script>

<style scoped>
    .messageList{
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        padding: 8px;
    }
    .msg-body{
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
