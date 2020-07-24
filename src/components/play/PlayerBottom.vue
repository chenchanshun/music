<template>
  <div class="playerboom">
    <div class="bottom-progress">
      <span ref="currtime">00:00</span>
      <div class="progress-bar" @click.self="progressmob">
        <div class="rpgress-line" ref="progress">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="totalTime">{{totaltime}}</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="modetype" ref="mode"></div>
      <div class="prev" @click="prev()"></div>
      <div class="play" @click.stop="ShowPlayering" ref="Play"></div>
      <div class="next" @click="next()"></div>
      <div class="favorite" @click="favor" :class="{'active':isfavor(currentsong)}"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import mode from "../../store/modetype";
import { formartTime } from "../../../../../music/src/tools/tools";
export default {
  name: "playerbooom",
  computed: {
    ...mapGetters([
      "isShowPlayering",
      "isModeType",
      "currentindex",
      "songs",
      "currentindex",
      "currTime",
      "favoriteslist",
      "currentsong"
    ])
  },
  methods: {
    
    ...mapActions([ "setShowPlayering",
                    "setModeType", 
                    "setcurrentplay",
                    'setcurrentTime',
                    "setfavorites",
                    'sethisotry',
                    
                    ]),
    ShowPlayering() {
      console.log(this.isShowPlayering);
      this.setShowPlayering(!this.isShowPlayering);
      this.sethisotry(this.currentsong)
      
    },
    modetype() {
      
      if (this.isModeType === mode.loop) {
        this.setModeType(mode.one);
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (this.isModeType === mode.one) {
        this.setModeType(mode.random);
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      } else if (this.isModeType === mode.random) {
        this.setModeType(mode.loop);
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      }
    },
    prev() {
      console.log(this.songs);
      this.setcurrentplay(this.currentindex - 1);
    },
    next() {
      this.setcurrentplay(this.currentindex + 1);
    },
    progressmob(event){
      let currentPos =  event.target.offsetLeft
      let pagePos = event.pageX
      let clickpage = pagePos-currentPos //点击的位置减去元素位置
      let eventwidth = event.target.offsetWidth
      let result = clickpage/eventwidth 
      //点到进度点
      console.log(event.target.offsetWidth)
      console.log(clickpage,'/',eventwidth,'=',  result)
      // console.log(pagePos + '-'+currentPos+'='+clickpage )
      this.$refs.progress.style.width = result*100 +'%'
      let resultTime =  this.totaltime*result
      // let currentTi = this.totaltime * result*100
      this.setcurrentTime(resultTime)
      
      
    },
    formartTime(time) {
      // 2.得到两个时间之间的差值(秒)
      let differSecond = time;
      // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
      let day = Math.floor(differSecond / (60 * 60 * 24));
      day = day >= 10 ? day : "0" + day;
      // 4.利用相差的总秒数 / 小时 % 24;
      let hour = Math.floor((differSecond / (60 * 60)) % 24);
      hour = hour >= 10 ? hour : "0" + hour;
      // 5.利用相差的总秒数 / 分钟 % 60;
      let minute = Math.floor((differSecond / 60) % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      // 6.利用相差的总秒数 % 秒数
      let second = Math.floor(differSecond % 60);
      second = second >= 10 ? second : "0" + second;
      return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
      };
    },
    favor(){
      this.setfavorites(this.currentsong)
      console.log(this.currentsong)
    },   
     isfavor(curfavor){
      console.log(this.favoriteslist)
      let result = this.favoriteslist.find(function(currentValue){
        return currentValue.id === curfavor.id
      })
      return result
    }

    // ,
    // currenttime() {
    //   console.log(formartTime(this.totaltime))
    //  let totaltime = formartTime(this.totaltime)
    //   return totaltime.minute + ":"+ totaltime.second;
    // }
  },
  props: {
    totaltime: {
      type: Number,
      default: 0,
      require: true
    },
    currentTime:{
      type:Number,
      default:0,
      require:true
    }
  },
  watch: {
    //当isShowPlayering发生变化时增删active
    isShowPlayering(newValue, oldValue) {
      if (newValue) {
        this.$refs.Play.classList.add("active");
      } else {
        this.$refs.Play.classList.remove("active");
      }
    },
    totaltime(newValue, oldValue){
    console.log(newValue)
    let time = formartTime(newValue)
    console.log(time)
    this.$refs.totalTime.innerHTML = time.minute + ':'+time.second
    
  },
   currentTime(newValue,oldValue){
    let currentPlayTime = formartTime(newValue)
    this.$refs.currtime.innerHTML = currentPlayTime.minute + ':' + currentPlayTime.second
    this.$refs.progress.style.width = newValue /this.totaltime  * 100 + '%'
    

  }
  },
  //监听每次变换状态时增删类
  isModeType(newValue, oldValue) {
    if (newValue == mode.loop) {
      this.$refs.mode.classList.remove("random");
      this.$refs.mode.classList.add("loop");
    } else if (newValue == mode.one) {
      this.$refs.mode.classList.remove("loop");
      this.$refs.mode.classList.add("one");
    } else if (newValue == mode.random) {
      this.$refs.mode.classList.remove("one");
      this.$refs.mode.classList.add("random");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.playerboom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .progress-bar {
      margin: 0 auto;
      height: 10px;
      width: 100%;
      background: #000;
      
      .rpgress-line {
        width: 0%;
        height: 10px;
        background: #ccc;
         position: relative;
         pointer-events:none;
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ccc;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    span {
      @include font_size($font_samll);
      @include font_color();
    }
  }
  .bottom-controll {
    width: 80%;
    // margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img("../../assets/images/loop");
      }
      &.one {
        @include bg_img("../../assets/images/one");
      }
      &.random {
        @include bg_img("../../assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("../../assets/images/prev");
    }
    .play {
      @include bg_img("../../assets/images/play");
      &.active {
        @include bg_img("../../assets/images/pause");
      }
    }
    .next {
      @include bg_img("../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../assets/images/un_favorite");
    &.active{
      @include bg_img("../../assets/images/favorite");
      }
    }
  }
}
</style>

