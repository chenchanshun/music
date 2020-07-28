<template>
  <div class="search">
    <div class="search-box">
      <svg t="1595840224154" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2355" width="200" height="200"><path d="M667.648 114.688c-152.576-152.576-400.384-152.576-552.96 0s-152.576 400.384 0 552.96C259.072 812.032 490.496 819.2 644.096 689.152l327.68 327.68 45.056-45.056-327.68-327.68C819.2 490.496 812.032 259.072 667.648 114.688zM635.904 635.904c-136.192 136.192-355.328 136.192-490.496 0S10.24 280.576 146.432 146.432 501.76 10.24 635.904 146.432 771.072 500.736 635.904 635.904z" p-id="2356" fill="#8a8a8a"></path></svg>
      <input type="text" v-thrott="request" placeholder="歌手、歌曲、专辑 " v-model="keywords">
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
</div>
</template>

<script>
import iscrollview from '../components/scrollview'
import {getsearch,getPopularrecom} from '../api/index'
import {mapActions} from 'vuex'
export default {
  name: 'search',
  data:function(){
    return{
      keywords:'',
      songs:[],
      PopularRecom:[]
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
    selectMusic(id){
          //dispatch用来调度actions
        //   this.$store.dispatch('setFullScreen',true)
        // this.setCurrentLyrics(id)
        console.log(id)
        this.setSongsDetail([id]),
        this.setFullScreen(true),
        this.setminiplayer(false)
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
          margin: 10px 15px;
          padding: 0 20px;
          box-sizing: border-box;
          border: 1px solid #949090;
          border-radius: 20px;
        }
      }
    }
  }
</style>
