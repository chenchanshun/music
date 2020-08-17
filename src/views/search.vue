<template>
  <div class="search">
    <div class="search-box">
      <svg t="1595840224154" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2355" width="200" height="200"><path d="M667.648 114.688c-152.576-152.576-400.384-152.576-552.96 0s-152.576 400.384 0 552.96C259.072 812.032 490.496 819.2 644.096 689.152l327.68 327.68 45.056-45.056-327.68-327.68C819.2 490.496 812.032 259.072 667.648 114.688zM635.904 635.904c-136.192 136.192-355.328 136.192-490.496 0S10.24 280.576 146.432 146.432 501.76 10.24 635.904 146.432 771.072 500.736 635.904 635.904z" p-id="2356" fill="#8a8a8a"></path></svg>
      <input type="text" v-thrott="request" placeholder="歌手、歌曲、专辑 " @keyup.enter="onSubmit"  v-model="keywords" >
    </div>
    <div class="suggest-list" v-if="keywords!==''">
      <iscrollview>
      <ul >
        <li v-for=" value in this.songs" :key="value.id" @click="selectMusic(value.id)">
          <svg t="1595840224154" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2355" width="200" height="200"><path d="M667.648 114.688c-152.576-152.576-400.384-152.576-552.96 0s-152.576 400.384 0 552.96C259.072 812.032 490.496 819.2 644.096 689.152l327.68 327.68 45.056-45.056-327.68-327.68C819.2 490.496 812.032 259.072 667.648 114.688zM635.904 635.904c-136.192 136.192-355.328 136.192-490.496 0S10.24 280.576 146.432 146.432 501.76 10.24 635.904 146.432 771.072 500.736 635.904 635.904z" p-id="2356" fill="#8a8a8a"></path></svg>
          <span>{{value.name}} - {{value.artists[0].name}}</span>
        </li>
      
      </ul>
      </iscrollview>
    </div>
    <div class="popularrecom" v-if="this.keywords == ''" >
      <ul>
        <li v-for="(value,index) in this.PopularRecom.data" :key="index" @click="searchcontent(value.searchWord)">
          {{value.searchWord}}
        </li>
      </ul>
    </div>
    <div class="history">
      <ul>
      <li v-for="(index,key) in historysearch" :key="key">
        <div class="history-left">
          <svg t="1597476941637" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3388" width="200" height="200"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m271.5 719.5c-35.3 35.3-76.4 63-122.1 82.3-47.3 20-97.6 30.2-149.4 30.2-51.9 0-102.2-10.1-149.5-30.2-45.7-19.3-86.8-47-122.1-82.3s-63-76.4-82.3-122.1c-20-47.3-30.1-97.6-30.1-149.4 0-51.9 10.1-102.2 30.1-149.5 19.3-45.7 47-86.8 82.3-122.1s76.4-63 122.1-82.3c47.3-20 97.6-30.1 149.5-30.1 51.9 0 102.1 10.1 149.4 30.1 45.7 19.3 86.8 47 122.1 82.3s63 76.4 82.3 122.1c20 47.3 30.2 97.6 30.2 149.5 0 51.9-10.1 102.1-30.2 149.4-19.3 45.7-47 86.8-82.3 122.1z" fill="#47444F" p-id="3389"></path><path d="M736 544H480V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v288c0 17.7 14.3 32 32 32h288c17.7 0 32-14.3 32-32s-14.3-32-32-32z" fill="#47444F" p-id="3390"></path></svg>
        </div>
        <p>{{index}}</p>
        <div class="history-right" @click="shut(index)">
          <svg t="1597477027678" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4148" width="200" height="200"><path d="M566.97558594 521.09667969L856.8828125 231.18945312c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355468l-1.58203125-1.58203125c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0L512 466.51660156 222.09277344 176.21386719c-14.63378906-14.63378906-38.75976563-14.63378906-53.39355469 0l-1.58203125 1.58203125c-15.02929688 14.63378906-15.02929688 38.75976563 0 53.39355469l289.90722656 289.90722656L167.1171875 811.00390625c-14.63378906 14.63378906-14.63378906 38.75976563 0 53.39355469l1.58203125 1.58203125c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0L512 576.07226563 801.90722656 865.97949219c14.63378906 14.63378906 38.75976563 14.63378906 53.39355469 0l1.58203125-1.58203125c14.63378906-14.63378906 14.63378906-38.75976563 0-53.39355469L566.97558594 521.09667969z" fill="#363F4D" p-id="4149"></path></svg>
        </div>
      </li>
      </ul>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import iscrollview from '../components/scrollview'
import {getsearch,getPopularrecom,getsearchlist} from '../api/index'
import {mapActions} from 'vuex'
export default {
  name: 'search',
  data:function(){
    return{
      keywords:'',
      songs:[],
      PopularRecom:[],
      historysearch:[]
    }
  },
  components:{
    iscrollview
  },
  methods:{
    request(){
      if(this.keywords =='')return
      getsearch({'keywords':this.keywords})
      .then((data) => {
        console.log(data)
        this.songs = data.result.songs
      }).catch((err) => {
        console.log(err)
      });
    },
    onSubmit(){
      this.$router.push({ path: `search/dtail/${this.keywords}/search` })
      console.log(this.keywords)
      // getsearchlist({keywords:this.keywords})
      // .then((data)=>{
      //   console.log(data)
      // })
      // .catch((err)=>{
      //   console.log(err)
      // })
      console.log('回车了')
      // if(!this.historysearch.includes(this.keywords)){
      //   this.historysearch.push(this.keywords)
      //    console.log('增加搜索历史')
      // }
          if(!this.historysearch.includes(this.keywords)){
        this.historysearch.push(this.keywords)
        // if(window.localStorage.getItem('historysearch') === undefined ||window.localStorage.getItem('historysearch') === null){
          window.localStorage.setItem('historysearch',JSON.stringify(this.historysearch))
        // }
         console.log(JSON.stringify(this.historysearch))
      }

    },
    selectMusic(id){
          //dispatch用来调度actions
        //   this.$store.dispatch('setFullScreen',true)
        // this.setCurrentLyrics(id)
        console.log(id)
        this.setSongsDetail([id]),
        this.setFullScreen(true),
        this.setminiplayer(false)
        console.log(window.localStorage.getItem('historysearch'))
        
        if(this.keywords == '')return
        if(!this.historysearch.includes(this.keywords)){
        this.historysearch.push(this.keywords)
          window.localStorage.setItem('historysearch',JSON.stringify(this.historysearch))
         
        //  console.log(JSON.stringify( window.localStorage.getItem('historysearch')))
      }

      
      },
    ...mapActions([
        'setFullScreen',
        'setminiplayer',
        'setSongsDetail',
        // 'setCurrentLyrics'
        
    ]),
    searchcontent(content){
      this.keywords = content
      this.request()
    },
    shut(name){
      this.historysearch = this.historysearch.filter(function(itme){
        return itme !== name
      })
       window.localStorage.setItem('historysearch',JSON.stringify(this.historysearch))
    }
    
  },
  //自定义节流指令
  directives: {
  thrott: {
    inserted: function (el,obj) {
      let closure = true  //定义开关
      el.addEventListener('input',function(){
        if(!closure)return//如果开关关闭 则弹出函数
        closure = false   //关闭开关
        setTimeout(function(){
          closure = true  //当执行的时候再开启开关
          obj.value()
        },1000)
      })
    }
  }
},
created(){
  getPopularrecom()
  .then((data)=>{
    this.PopularRecom = data
  })
  .catch((err)=>{
    console.log(err)
  })
  // this.historysearch = window.localStorage.getItem("historysearch")
   if(window.localStorage.getItem('historysearch') === undefined ||window.localStorage.getItem('historysearch') === null){
          return
     }
     console.log(JSON.parse(window.localStorage.getItem('historysearch')))
      this.historysearch = JSON.parse(window.localStorage.getItem('historysearch'))
}
}
</script>

<style lang="scss" scoped>
.search{
  position: fixed;
  top: 224px;
  width: 70%;
  margin-left: 50%;
  left: -45%;
.search-box{
  width: 100%;
  height: 60px;
  
  input{
    width: 100%;
    height: 100%;
    border: none;
    background:#f1ecec;
    border-radius: 20px;
    outline: none;
    padding: 0 60px;
  }

  svg{
    position: absolute;
    top: 50%;
    margin-top: -20px;
    left: 2%;
    width: 50px;
    height: 40px;

  }
  
}
  .suggest-list{
    position: fixed;
      top: 304px;
      bottom: 0;
      left: 50px;
      width: 85%;
      overflow: hidden;

    ul{
      
      li{
        position: relative;
        height: 70px;
        width: 100%;
        border-top: 1px solid rgb(190, 188, 188);
        background: #f8f8f8;
        svg{
          position: absolute;
          top: 15px;
          width: 50px;
          height: 40px;
        }
        span{
          margin-left: 70px;
          text-align: center;
          line-height: 70px;
          font-size: 28px;

        }
      }
    }
  }
    .popularrecom{
      position: absolute;
      top:100px;
      left: 50px;
      width: 100%;

      ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
          margin: 10px 5px;
          padding: 0 10px;
          box-sizing: border-box;
          border: 1px solid #949090;
          border-radius: 20px;
        }
      }
    }
    .history{
      position: absolute;
      top:550px;
      left: 50px;
      width: 100%;
      ul{
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #c3c3c3;
          box-sizing: border-box;
          margin-bottom: 15px;
          height: 50px;
          p{
            position: absolute;
            left: 60px;
          }
          div{
             height: 40px;
            svg{
              height: 40px;
              width: 50px;
            }
          }
          
          
        }
      }
    }
  }
</style>
