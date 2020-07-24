<template>
  <div class="recommen">
    <!-- 将banner数据传给子组件 -->
    <div class="recommen-warpper">
      <Scrollview>
      <div>
    <Banner :banners = "banners"></Banner>
    <!-- 分别将albums与result传入result -->
    <Personalized :result = 'result' :title="'推荐歌单'" @select="fatherSelectItme" :type="'Personalized'"></Personalized>
    <Personalized :result = 'albums' :title="'最新专辑'" @select="fatherSelectItme" :type="'albums'"></Personalized>
    <songs :songs= 'songs'></songs>       
      </div>
    </Scrollview>
    </div>
     <transition>
       <router-view></router-view>
     </transition>
    </div>
</template>

<script>
import { getBanner,getnewAlbum,getnewSong} from '../api/index'
import { getpersonalized } from '../api/index'
import { mapActions } from 'vuex'

import Banner from '../components/Banner'
import Personalized from '../components/personalized'
import songs from '../components/songList'
import Scrollview from '../components/scrollview'
export default {
  name: 'racommen',
  data(){
    return {
      banners:[],
      result:[],//推荐歌单
      albums:[],
      songs:[]

    }
  },
  created () {
  //  console.log('执行5531')
   //  5-31 箭头函数
    getBanner().then((data)=>{
      //请求到数据后保存
      this.banners = data.banners
      console.log(data)
    })
    .catch(function(err){
      console.log(err)
    })
    getpersonalized().then((data)=>{
      //请求到数据后保存
       this.result = data.result 
    })
    .catch(function(err){
      console.log(err)
    })
      getnewAlbum().then((data)=>{
      //请求到数据后保存
      this.albums=data.albums.splice(0,6)
      // console.log(this.albums)
      
    })
    .catch(function(err){
      console.log(err)
    })

    getnewSong().then((data)=>{
      //请求到数据后保存
      //  console.log(data.result)
       var list = []
       data.result.forEach(value => {
         let obj = {}
        //  console.log(value)
         obj.name = value.name
         obj.id = value.id

         obj.url = value.song.album.blurPicUrl
      //   //  value.song.artists[0].name
        var singer = ''
         for(let i = 0;i< value.song.artists.length;i++){
           if(value.song.artists.length == 1){
             singer= value.song.artists[i].name
           }else{
            singer= singer +'-'+ value.song.artists[i].name
           }
         }
         obj.singer = singer
        list.push(obj)
      //    console.log(obj)
        //  console.log(list)


       });
       this.songs = list
    })
    .catch(function(err){
      console.log(err)
    })
  

      
      
  },
  components:{
    Banner,
    Personalized,
    songs,
    Scrollview
    
  },
  methods:{
    //  用js实现跳转
    fatherSelectItme(id,type){
      this.getLyricsType(type)
      this.getLyricsId(id)
      this.$router.push({
        path:`/recommen/detail/${id}/${type}`
      })
    },
    ...mapActions([
      'getLyricsType',
      'getLyricsId'
    ])
    //  Selectnewestalbum(id,type){
    //   //  console.log(type)
    //   this.$router.push({
    //     path:`/recommen/album/newest/${id}/${type}`
    //   })
    // }
  }
}
</script>



<style lang="scss" scoped>
.recommen{
  position: fixed;
  top: 184px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  // overflow: hidden;
  .recommen-warpper{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
  
}



.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}

.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
