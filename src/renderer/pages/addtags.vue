<template>
  <div class="wrap" style="overflow-y: auto">
    <div>
        <h2>我的技能</h2>
        <span @click="deletetag(index, item.pid, item)" v-for="(item, index) in mytags">{{item.title}}</span>
    </div>
    <div v-for="(item, index) in othertags">
        <h2>{{item.title}}</h2>
        <span @click="addtag(index, idx, val)" v-for="(val, idx) in item.children">{{val.title}}</span>
    </div>
    <div @click="submit" class="savebtn f_z b_m pointer">保存</div>
  </div>
</template>

<script>
import eventBus from '../api/eventBus'
import { handlesuccess } from '../api/toast'
import { X_gettaglist, X_addtags } from '../api/xhr'
let mytagsMap = new Map()
let othertagsMap = new Map()
let othertagschildMap = new Map()
export default {
  data () {
    return {
      type: null, 
      mytags: [],
      othertags: [],
    }
  },

  computed: {
     
  },

  created(){
    const that = this
    that.type = that.$route.query.id
    eventBus.$on('getMytags', function(data){
        data.forEach((item) => {
            mytagsMap.set(item.id, item)
        })
        // that.a = 'kkkkkkkkkkkkkkkkkkk'
        that.mytags = [...mytagsMap.values()]
        X_gettaglist({tid: that.$route.query.id}).then(res =>{
            if(res.data.code == 10000){
                res.data.data.child.forEach((item) => {
                    that.getTagItem(item)
                    // if(that.type == 1){
                    //     let obj = item
                    //     item.children.forEach((val) => {
                    //         if(!mytagsMap.has(val.id)){
                    //             othertagschildMap.set(val.id, val)
                    //         }
                    //     })
                    //     obj['children'] = [...othertagschildMap.values()]

                    //     othertagsMap.set(item.id, obj)
                    //     othertagschildMap.clear()
                    // }
                    // if(that.type == 3){
                    //     item.children.forEach((val) => {
                    //         if(val.grandson){
                    //             let obj = val
                    //             val.grandson.forEach((gson) => {
                    //                if(!mytagsMap.has(gson.id)){
                    //                     othertagschildMap.set(gson.id, gson)
                                        
                    //                 }
                    //             })
                    //             obj['children'] = [...othertagschildMap.values()]

                    //             othertagsMap.set(item.id, obj)
                    //             othertagschildMap.clear()
                    //         }
                           
                    //     })
                    // }
                })
                console.log(that.othertags)
                that.othertags = [...othertagsMap.values()]
            }
        })
    })
    
  },

  mounted(){

  },

  methods: {
    addtag(pindex, cindex, val){
        // othertagschildMap.clear()
        // console.log(othertagsMap.get(pid))
        this.othertags[pindex].children.splice(cindex, 1)
        this.mytags.push(val)

    },

    deletetag(idx, pid, item){
        console.log(this.othertags)
        console.log([...othertagsMap.keys()])
        let index = [...othertagsMap.keys()].findIndex(function(value) {
            return value.toString() == pid.toString() 
        })
        console.log(index)
        this.mytags.splice(idx, 1)
        this.othertags[index].children.push(item)
    },

    submit(){
        let data = []
        this.mytags.forEach((item) => {
          data.push({
             "id": item.id,
             "title": item.title
          })
        })
        data = JSON.stringify(data)
        X_addtags({type: this.type, data: data}).then(res =>{
            console.log(res)
            if(res.data.code == 10000){
                handlesuccess('保存成功', '')
                this.$router.go(-1)
            }
        })
    },

    getTagItem(obj){
        let tagItem = true
        for(let key in obj){
            if(obj[key] instanceof Array) {
                obj[key].forEach((item) => {
                  this.getTagItem(item)
                })
            }   
        }
        if(tagItem) {
            let objtag = obj
            if(!mytagsMap.has(obj.id)){
                othertagschildMap.set(obj.id, obj)
            }
            console.log([...othertagschildMap.values()])  
            objtag['children'] = [...othertagschildMap.values()]
            othertagsMap.set(objtag.id, objtag)
            othertagschildMap.clear()
        }
            

    }
  },

  beforeDestroy(){
    mytagsMap.clear()
    othertagsMap.clear()
    othertagschildMap.clear()
    eventBus.$off('getMytags')
  },

  components: {
  }
}
</script>

<style scoped>
.wrap span{
    display: inline-block;
    padding: 5px;
    background: #38475d;
    color: #FFFFFF;
    margin: 3px;
}
.savebtn{
    height: 36px;
    line-height: 36px;
    width: 108px;
    text-align: center;
    color: #FFFFFF; 
    border-radius: 5px;
    margin: 20px auto 10px;
}
</style>
