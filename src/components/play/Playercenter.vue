<template>
<div>
  <div class="center">
    <div class="cd-wrapper" ref="playcenter" @click="showlyrics" >
      <img class="bg" :src="currentsong.url" alt="" srcset="">
    </div>
   
  </div>
   <div class="scrolllyrics" >
     <p >{{this.currlyr}}</p>
     <!-- v-if="key == parseInt(currentTime) 
     <!-- <p >{{key}}</p> -->
   </div>
</div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import {mapGetters,mapActions} from 'vuex'
export default {
  name:'playercenter',
  data:function(){
    return{
      currlyr:'',
      tLyricNum:'0'
    }
  },
   components: {
    // Swiper,
    // SwiperSlide
  },
  computed:{
      ...mapGetters([
         'isShowPlayering',
         'currentsong',
         'currentLyric',
         'lyricstype',
         'lyricsDetailId'
      ])
  },
  watch:{
    isShowPlayering(newValue,oldValue){
          if(newValue){
          this.$refs.playcenter.classList.add('active');
          }else{
          this.$refs.playcenter.classList.remove('active');
          }
    },
    currentTime(newValue){
      this.tLyricNum = newValue
      var currtime = parseInt(this.currentTime)
      this.listcurrentlyrcis(currtime)
    },
    currentLyric(newValue){
      for (const key in newValue) {
        this.tLyricNum = key
        
        return
      }
    }
  },
  //  data() {
  //   return {
  //     swiperOption: {
  //       // 如果需要分页器
  //       observer: true,
  //       observeParents: true,
  //       observeSlideChildren: true
  //     }
  //   };
  // },
  methods:{
    //递归寻找上一句歌词
    listcurrentlyrcis(currtime){
      if(currtime < 0){
        currtime = this.tLyricNum
        return
      }
      // for(let key in this.currentLyric){
      //   console.log(this.currentLyric[key])
        // return this.currentLyric
        var lyr = this.currentLyric[currtime] 
        if(lyr === undefined ){
          // console.log(lyr)
          // this.currlyr = lyr
          // console.log(currtime)  
          currtime--    
          // console.log(currtime)  
          return this.listcurrentlyrcis(currtime)
          // this.currlyr = this.currlyr[currtime] 
          
        }else{
          this.currlyr = lyr
        }
        

      
      //  console.log(this.currentTime)
    // parseInt(currentTime)
      
    },
    lyricsrouting(){
      let id =this.lyricsDetailId
      let type =this.lyricstype
      console.log(id,type)
      this.$router.push({
        path:`/recommen/detail/${id}/${type}/Lyrics`
      })
        
    },
    showlyrics(){
      this.setlyrics(true)
    },
    ...mapActions([
      'setlyrics'
    ])

  },
  props:{
    currentTime:{
      type:Number,
      default:0,
      required:true
    }
  }
}
</script>

<style lang="scss" scoped>
  .scrolllyrics{
         position: fixed;
         bottom: 420px;
         top: 65%;
         left: 50%;
         margin-left:-250px ;
         width: 500px;
         height: 50px;
          p{
            width: 100%;
            height:100%;
            text-align: center;
            color: bisque;
          }
     }
.center{
    position: fixed;
    top: 50px;
    // bottom: 250px;
    width: 470px;
    height: 470px;
    border-radius: 50%; 
    // border: 15px solid #fff;
    left: 0px;
    right: 0px;

  
}
 .cd-wrapper{
      //  display: block;
        // margin: 0px auto;
        // margin-left: 55px;
        position: fixed;
          width: 470px;
          height: 470px;
          border-radius: 50%; 
          border: 15px solid rgb(70, 43, 43);
          overflow: hidden;
          animation: sport 2s linear infinite;
          animation-play-state: paused;
          left:50%;
          top:35%;
          margin-left: -250px;
          margin-top: -250px;
          &.active{
          animation-play-state:  running;

      }
        .bg{
          position: fixed;
          width: 500px;
          height: 500px;
          left:50%;
          top:50%;
          margin-left: -250px;
          margin-top: -250px;
          border-radius: 50%; 
          // border:1px solid red;
  

        }
        .iscroll{
          position: fixed;
          width: 500px;
          height: 500px;
          left: 50%;
          top: 50%;
          margin-top: -248px;
          margin-left: -248px;


        }
        .con{
          position: fixed;
            width: 500px;
            height: 500px;
        }
      
        // .bg{
        // // margin-top: 115px;
        //     position: fixed;
        // // border: 10px solid red;
        //     width: 400px;
        //     height: 400px;
        //     border-radius: 50%; 
        //     // margin-left: 120px;
        //     //  overflow: hidden;
        //   .con{
        //     position: fixed;
        //     width: 500px;
        //     height: 500px;
        //     left: 120px;
        //     top: 70px;
        //     // overflow: hidden;
        //     // animation: sport 2s linear infinite;

        //   }
        //   .iscroll{
        //       // position: fixed;
        //       // // top: 10px;
        //       // // left: 0;
        //       // // bottom: 0;
        //       width: 632px;
        //       height: 632px;
        //       // overflow: hidden;
              
        //   }
        // } 
        
    }
    @keyframes sport{
      from{
        transform: rotate(0deg);

      }to{
        transform: rotate(360deg);
      }
    }

</style>