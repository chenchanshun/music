<template>
  <div class="dtail">
    <SubHeader :title="playlist.name"></SubHeader>
    <DetailImg :path="playlist.coverImgUrl" ref="top"></DetailImg>
    <div class="bottom">
        <Scrollview ref="scrollview">
        <Detailbottom :playlist="playlist.tracks"></Detailbottom>
        </Scrollview>
    </div>
  </div>
</template>
<script>
import SubHeader from '../components/SubHeader'
import DetailImg from '../components/Detailimg'
import Detailbottom from '../components/detailBottom'
import Scrollview from '../components/scrollview'
import { getplaylist,getnAlbum,getsinger,getrankDtail,getsearchlist} from '../api/index'
export default {
    name:'Dtail',
    components:{
      SubHeader,
      DetailImg,
      Detailbottom,
      Scrollview
    },
    data:function(){
      return {
        playlist:{}
      }
    },

    created(){
      // console.log(this.$route.params.type)
      if(this.$route.params.type == 'Personalized'){
        getplaylist({
        //取出事先$router.push进去的id
        id:this.$route.params.id
      })
      .then((data) =>{
        // console.log(data)
        this.playlist = data.playlist
      })
      .catch((err) => {
        console.log(err)
      })
      }else if(this.$route.params.type == 'albums'){
        //传入id = album/id=156151
      getnAlbum({id:this.$route.params.id}).then((data)=>{
        // console.log(data)
        this.playlist = {
          name:data.album.name,
          coverImgUrl:data.album.blurPicUrl,
          tracks:data.songs
          }
        }
       )
      .catch(function(err){
          console.log(err)
          })
        }else if(this.$route.params.type == 'singer'){
        //传入id = album/id=156151
        getsinger({id:this.$route.params.id}).then((data)=>{
          console.log(data)
          this.playlist = {
            name:data.artist.name,
            coverImgUrl:data.artist.img1v1Url,
            tracks:data.hotSongs
            }
          }
        )
        .catch(function(err){
            console.log(err)
            })
          }else if(this.$route.params.type == 'rank'){
        //传入id = album/id=156151
        getrankDtail({id:this.$route.params.id}).then((data)=>{
          console.log(data)
          this.playlist = {
            name:data.playlist.name,
            coverImgUrl:data.playlist.coverImgUrl,
            tracks:data.playlist.tracks
            }
          }
        )
        .catch(function(err){
            console.log(err)
            })
          }else if(this.$route.params.type == 'search'){
        //传入id = album/id=156151
          // 传入id = album/id=156151
              console.log(this.keywords)

            getsearchlist({keywords:this.$route.params.key})
            .then((data)=>{
              console.log(data.result.songs)
              this.playlist = {
            name:this.$route.params.key,
            coverImgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597223810575&di=faf60a7ccd3d4ce5d95195345b3c552d&imgtype=0&src=http%3A%2F%2Fsrc.house.sina.com.cn%2Fimp%2Fimp%2Fdeal%2F5a%2F60%2Fe%2F33b295d894bd9a56342e13f3efe_p1_mk1.jpg',
            tracks:data.result.songs
            }
            })
            .catch((err)=>{
              console.log(err)
            })
          }


      },

   
    mounted(){
      let defaultHeight = this.$refs.top.$el.offsetHeight
      console.log(defaultHeight)
      
      //获取偏移位

      this.$refs.scrollview.scrolling((offsetY) =>{
         if(offsetY <0){
          console.log(offsetY)
         let scale = 10* Math.abs(offsetY) / defaultHeight
         this.$refs.top.$el.style.filter = `blur(${scale}px)`
         }else{
         console.log(offsetY)
        let scale = 1 + offsetY / defaultHeight
         this.$refs.top.$el.style.transform = `scale(${scale})`
         }
      })
    }

}
</script>

<style scoped lang="scss" >
@import '../assets/css/mixin';
.dtail{
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0px;
  right: 0px;
  @include bg_sub_color();
  

}
.bottom{
  position: fixed;
  top: 500px;
  left: 0px;
  right: 0px;
  bottom: 0px;

}

</style>
