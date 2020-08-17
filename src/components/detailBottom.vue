<template>
  <ul class="detailbot">
      <li class="detailbot-top" @click="selectMusicAll">
          <div class="bottom-icon"></div>
          <div class="bottom-title" >播放全部</div>
      </li>
      <li v-for="value in playlist" :key="value.id" class="itme" @click="selectMusic(value.id)">
          <h3>{{value.name}}</h3>
          <p v-if="value.al !== undefined">{{value.al.name}}-{{value.ar[0].name}}</p>
          <p v-if="value.al == undefined">{{value.artists[0].name}}</p>
      </li>
      
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name:'Detailbottom',
  props:{
      playlist: {
      type: Array,
      default: ()=>[],
      required: true,
      
      }
  },
  data:function(){
      return{
         
      }
  },
  methods:{
        ...mapActions([
        'setFullScreen',
        'setminiplayer',
        'setSongsDetail',
        // 'setCurrentLyrics'
        
    ]),
      selectMusic(id){
          //dispatch用来调度actions
        //   this.$store.dispatch('setFullScreen',true)
        // this.setCurrentLyrics(id)
        console.log(id)
        this.setSongsDetail([id]),
        this.setFullScreen(true),
        this.setminiplayer(false)
      },
      selectMusicAll(){
        this.setminiplayer(false)

        this.setFullScreen(true)
        // console.log(this.playlist)
        let ids = this.playlist.map(function(item){
            return item.id
        })
        console.log(ids)
        this.setSongsDetail(ids)
      }

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';
@import '../assets/css/variable';

 .detailbot{
    width: 100%;
     border-top-left-radius: 50px;
     border-top-right-radius: 50px;
     @include bg_sub_color();
    li{
        width:100%;
        height:100px;
        padding: 20px;
        // border: 1px solid red;
        box-sizing: border-box;


    }
    .detailbot-top{
      display: flex;
       align-items: center;
      
        .bottom-icon{
        width: 60px;
        height: 60px;
        @include bg_img('../assets/images/small_play')
    }
    .bottom-title{
        margin-left: 20px;
        @include font_size($font_large);
        @include font_color();
    }
    
        
    }
    .itme{
        h3{
            @include font_size($font_medium_s);
            @include font_color();
        }
        p{
             @include font_size($font_medium_s);
             @include font_color();
        }

    }
   
}
</style>