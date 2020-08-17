<template>
 <transition
   :css="false"
   @enter="enter"
   @leave="leave"

   >
  <div class="mini-player" v-show="isShowminiplayer">
      <div class="player-warpper">
        <div class="player-left">
          <img :src="this.currentsong.url" ref="playing" @click="showMusiclist" alt="">
          <div class="player-title">
             <h3>{{this.currentsong.name}}</h3>
             <p>{{this.currentsong.songs}}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" ref="play" @click="isShowPlay"></div>
          <div class="list" @click="playList"></div>
        </div>
         
      </div>
  </div>
   </transition>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
//velocity 动画
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name:'miniplayer',
  computed:{
    ...mapGetters([
      'isShowminiplayer',
      'isShowPlayering',
      'isShowPlayerList',
      'songs',
      'currentsong'
    ]),

  },
      watch:{
      isShowPlayering(newValue,oldValue){
        if(newValue){
          this.$refs.play.classList.add('active')
          this.$refs.playing.classList.add('active')

        }else{
          this.$refs.play.classList.remove('active')
          this.$refs.playing.classList.remove('active')


        }
      }
    },
  methods:{
    enter(el,done){
    Velocity(el, 'transition.bounceUpIn', { duration: 500 },function(){
      done();
    })
    },
    leave(el,done){
    Velocity(el, 'transition.bounceDownOut', { duration: 500 },function(){
      done();
    })

    },
    playList(){
      this.setListType(true)
      console.log(this.isShowPlayerList)
    },
    ...mapActions([
      'setFullScreen',
      'setminiplayer',
      'setShowPlayering',
      'setListType'
    ]),
    showMusiclist(){
       this.setFullScreen(true)
       this.setminiplayer(false)
    },
    isShowPlay(){
      this.setShowPlayering(!this.isShowPlayering)
    }
  

  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';

  .mini-player{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 150px;
    .player-warpper{
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    .player-left{
      display: flex;
      padding-left: 20px;
     img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-top:20px ;
      margin-right: 20px;
      animation: sport 2s linear infinite;
      animation-play-state: paused;
      &.active{
      animation-play-state: running;
      }
     }
     .player-title{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      h3{
        @include font_size($font_medium_s);
        @include font-color();
      }
      p{
        @include font_size($font_medium);
        @include font-color();
      }
      
    }
    }
    .player-right{
      display: flex;
      align-items: center;
      // padding: 0px 20px;
      .play{
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
        }
        
       .list{
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list')

          }
       }
   
    

     }
     @keyframes sport{
      from{
        transform: rotate(0deg);

      }to{
        transform: rotate(360deg);
      }
    }
    
  }

</style>