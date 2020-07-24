<template>
   
   <transition
   :css="false"
   @enter="enter"
   @leave="leave"

   >
      <!-- <div class="player" v-show="this.$store.getters.isfullScreen"> -->
   <div class="player" v-show="this.isfullScreen" >

    <div class="player-warpper">
    <PlayerHeader></PlayerHeader>
    <Playercenter :currentTime = currentTime></Playercenter>
    <PlayerBottom :totaltime="totaltime" :currentTime="currentTime"></PlayerBottom>
    <audio :src="currentsong.musicurl" @timeupdate="timeupdates"  @ended="end" ref="audio"></audio>
    </div>
    <div class="palyer-bg">
      <img :src="currentsong.url" alt="">
    </div>
  </div>
   </transition>
 
</template>

<script>
import PlayerHeader from '../play/PlayerHeader'
import Playercenter from '../play/Playercenter'
import PlayerBottom from '../play/PlayerBottom'
// import Lyrics from '../lyrics'
import { mapGetters,mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import mode from '../../store/modetype'
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
       'setcurrentTime',
       'setcurrentplay',
       'setfavoriteslist',
       'sethisotry',
       'sethisotrylist'
   ]),
   
    timeupdates(){
      this.currentTime =this.$refs.audio.currentTime
      // this.currTime = this.currentTime
      
    },
    end(){
      if(this.isModeType == mode.loop){
        this.setcurrentplay(this.currentindex + 1)
      }else if(this.isModeType ==mode.one){
        this.$refs.audio.play()
      }else if(this.isModeType == mode.random){
        let curindex  = this.betweenrandom(0,this.songs.length - 1)
        this.setcurrentplay(curindex)
      }
    },
    betweenrandom(min,max){
       min = Math.ceil(min)
       max = Math.floor(max)
       console.log(min,max)
       return Math.floor(Math.random() * (max - min+1))+ min
       //因为Math.random是求出大于都等于0 小于1的数
       //所以floor向下取整 max-min +1

    },
    get(){
      this.$emit('currents',this.currentTime)
    }
  


  },
  //在计算属性里面映射
  computed:{
    //将vuex中的数据映射
    ...mapGetters([
      'isfullScreen',
      'currentsong',
      'isShowPlayering',
      'currentindex',
      'currTime',
      'isModeType',
       'songs',
       'favoriteslist',
       'hisotry'


    ])
  },
  mounted(){
    //当播放器可以被播放的时候 覆盖时长
    this.$refs.audio.ondurationchange =() =>{
      this.totaltime = this.$refs.audio.duration
    }
   
  },
  updated(){
    this.get()
  },
  data:function(){
    return{
      totaltime :0,
      currentTime:0
    }
  },
  watch:{
     currentsong(newValue,oldValue){
       console.log(newValue)
       if(newValue == undefined)
       {
         return "没有获取到数据"
       }
       this.getSongyrics(newValue.id)
     },
     isShowPlayering(newValue,oldValue){
       if(newValue){
         console.log(this.currentindex)
         this.$refs.audio.play();
       }else{
         this.$refs.audio.pause();

       }
     },
     currentindex(){
        this.totaltime = this.$refs.audio.duration
        this.$refs.audio.ondurationchange = ()=>{
         console.log(this.isShowPlayering)

        if(this.isShowPlayering){
            this.$refs.audio.play();
            this.sethisotry(this.currentsong)

        }else{
            this.$refs.audio.pause();
            }
          } 
      },
     currTime(newValue,oldValue){
       console.log(newValue)
       this.$refs.audio.currentTime = newValue
      // this.$refs.audio.duration = this.currTime
     },
     favoriteslist(newValue,oldValue){
       window.localStorage.setItem('favoriteslist',JSON.stringify(newValue))
     },
     hisotry(newValue,oldValue){
       console.log(newValue)
       window.localStorage.setItem('hisotry',JSON.stringify(newValue))
     }
     
   },
   
  components:{
    PlayerHeader,
    Playercenter,
    PlayerBottom
    // Lyrics
  },
  created(){
    let result = JSON.parse(window.localStorage.getItem('favoriteslist'))
    console.log(result)
    if(result == null){return}

    this.setfavoriteslist(result)
    let resultwo = JSON.parse(window.localStorage.getItem('hisotry'))
    if(resultwo == null){return}
    console.log(resultwo)
    this.sethisotrylist(resultwo)
  }
}
</script>
<style lang="scss" scoped>
.player{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: pink;
    
    
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
</style>