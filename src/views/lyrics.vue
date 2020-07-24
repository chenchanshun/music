<template>
 <Scrollviem>
   <transition
   :css="false"
   @enter="enter"
   @leave="leave">
      <!-- <div class="player" v-show="this.$store.getters.isfullScreen"> -->
      
    
   <div class="player" v-show="this.lyricsIsshow" @click="scroll">
    <div class="player-warpper">
      <div class="lyricsHeader">
        <div class="header">
          <div class="header-left" @click.stop="lyricsnoshow"></div>
            <div class="header-title">
              <h3>{{currentsong.name}}</h3>
              <p>{{currentsong.songs}}</p>
              </div>
              <div class="header-right"></div>
          </div>
    
      </div>
    
    </div>
   
       
     
    <div class="palyer-bg">
      <img  alt="">
     </div>
     <div class="lyr" ref="wrapper">

       <ul  >
        <li v-for="(value,index) in currentLyric" :key="index">{{value}}</li>
      </ul>
      
     </div>

  </div>
   </transition>
     </Scrollviem>
 
</template>

<script>
//ddd
// import PlayerHeader from '../components/play/PlayerHeader'
// import Lyrics from '../lyrics'
import { mapGetters,mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import Scrollviem from '../../src/components/scrollview'
// import IScroll from 'iscroll/build/iscroll-probe'   
export default {
  name:'player',
  methods:{
    enter(el,done){
    Velocity(el, 'transition.shrinkIn', { duration: 500 },function(){
      done();
    })
    },
    leave(el,done){
    Velocity(el, 'transition.shrinkOut', { duration: 500 },function(){
      done();
    })
   
    
    
   },
   ...mapActions([
       'getSongyrics',
       'setlyrics'

   ]),
   lyricsnoshow(){
     this.setlyrics(false)
   },
    scroll(){
      var div = document.createElement("div");
      var pl = document.getElementsByClassName('player')[0]
      pl.appendChild(div)
    }

  },
  watch:{
     currentsong(newValue){
       console.log(newValue)
       this.getSongyrics(newValue.id)
     }

     
     
   },
   data:function(){
     return{
       myScroll:null
     }
   },
  components:{
    // PlayerHeader,
    // Lyrics
    Scrollviem
  },
  //在计算属性里面映射
  computed:{
    //将vuex中的数据映射
    ...mapGetters([
      'isfullScreen',
      'currentsong',
      'lyricsIsshow',
      'currentLyric'
     
    ])
  },
   mounted() {
   },
   updated(){
    //  this.myScroll.refresh()
    //sssssss
   }
   
  
}
</script>
<style lang="scss" scoped>
  @import "../assets/css/variable.scss";
  @import "../assets/css/mixin.scss";
.lyr{
 position: fixed;
  top: 150px;
  left: 0px;
  right: 0px;
  bottom: 0px;

    // overflow: hidden;
     ul{
      width: 100%;
      height: 100%;
      // display: inline-block;
      
      li{
        color: bisque;
        opacity: .5;
        font-size: 26px;
        text-align: center;
      }
    } 
 
 
  
}

.player{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background: pink;
    height: 6000px;
    z-index: 899;
    background: black;

}
 .player-warpper{
   width: 100%;
   height: 100%;
   position: relative;
  z-index: 1000;
 }
  .palyer-bg{
    position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      img{
        // width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        filter: blur(10px);
      }
    
    }
    .header {
  width: 100%;
  height: 100px;
  // @include bg_color();
  // position: relative;
  // z-index: 999;
  display: flex;
  justify-content: space-between;
}
 .header-left, .header-right{
    width: 84px;
    height: 84px;
    // background: #000;
    margin-top: 8px;

}
.header-left{
  @include bg_img('../assets/images/back');
}
.header-right{
  @include bg_img('../assets/images/more')
}
.header-title{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
   text-align: center;

   color: #fff;
  //  font-weight: 300;
  @include font_size($font_minx);
  @include no-wrap();

}
</style>