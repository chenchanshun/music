<template>
  <div class="song">
      <div class="song-top">
          <h3>最新音乐</h3>
      </div>
      <list :songs = songs></list>
      <!-- <ul class="song-list">
          <li v-for ="value in songs" :key="value.id" class="itme" @click="showDetailMusic(value.id)">
              <img v-lazy="value.song.album.blurPicUrl" alt="">
              <div>
                  <h3>{{value.name}}</h3>
                  <p>{{value.song.artists[0].name}}</p>
              </div>
          </li>
      </ul> -->

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import list from '../components/play/list'
export default {
    name:'song',
  
    props:{
        songs:{
            type:Array,
            default:() =>[],
            required:true
        }
    },
    methods:{
        ...mapActions([
            'setFullScreen',
            'setminiplayer',
            'setSongsDetail'
        ]),
        showDetailMusic(id){
            this.setFullScreen(true)
            this.setminiplayer(false)
            this.setSongsDetail([id])
        }
    },
    components:{
        list
    }
}
</script>

<style scoped lang="scss">
@import '../assets/css/mixin';
@import '../assets/css/variable';
    .song{
         @include bg_sub_color();
        .song-top{
         width: 100%;
         height: 84px;
         line-height: 84px;
         padding: 0 20px;
         border-bottom: 1px solid #fff;
         @include bg_sub_color();
         h3{
            @include font_size($font_large);
            font-weight:bold;
            @include font_color();
        }
        .song-list{
            width: 100%;
       
       
        }
        
   }
 }
</style>
<style scoped lang="scss">
@import '../assets/css/mixin';
@import '../assets/css/variable';
      .itme{
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        margin-bottom: 20px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
         }
        .itme img{
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 20px;
        
        }
           div{
              h3{
                  @include font_size($font-large);
                  @include font_color();
              }
              p{
                   @include font_color();
                   @include font_size($font-samll);
                   opacity: 0.6;
                   margin-top:20px
              }
          }
        

</style>