<template>
<div class="singer">
  <div class="singer-warpper">
    <Scrollview ref="scrollview">
      <ul>
        <li class="letter" ref="iscroll" v-for="(value,index) in letter" :key="index">
          <h2 >{{value}}</h2>
          <ul class="singers">
            <li v-for="(value) in requset[index] " :key="value.id" @click="switchSinger(value.id)">
              <div class="imgru">
              <img v-lazy="value.picUrl" alt="" srcset="">
              </div>
              <span>{{value.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
   </Scrollview>
  <ul class="nav">
    <li v-for="(value,index) in letter" 
    @touchstart.stop = "touchstar"
    @touchmove.stop = "touchmove"
    :data-index = index 

    :class="{'active':currentindex == index}" :key="index">
      {{value}}
    </li>
  </ul>
  <div v-show="firsttitle!== ''" class="top-nav" ref="firsttitle">{{firsttitle}}</div>
  
  </div>
     <transition>
       <router-view></router-view>
     </transition>
</div>


</template>

<script>
import {getLetterSinger,getallLetter} from '../api/index'
import Scrollview from '../components/scrollview'
export default {
  name: 'singer',
  data:function(){
    return{
      letter:[],
      requset:[],
      iscroll:[],
      currentindex:0,
      starpage:0,
      movepage:0,
      iscrollpath:0,
      firsttitleY:85,
    }
  },
  computed:{
      firsttitle(){
      if(this.currentindex <= 0 ){
        return ''
      }else{
        return this.letter[this.currentindex]
      }
    }
  },
  components:{
    Scrollview,
  },
  methods:{
    keydwn(index){
      this.currentindex = index 
      // console.log(this.currentindex)
      var offsetY = this.iscroll[index]
      // console.log(-offsetY)
      this.$refs.scrollview.scrollTo(0,-offsetY)
    },
    touchstar(e){
      let setoffY =  e.target.dataset.index 
      this.keydwn(setoffY)
      this.starpage = e.touches[0].pageY
    },
    touchmove(e){
      this.movepage = e.touches[0].pageY
      //计算移动的距离 用移动的距离除以元素的宽高得出index
      let currpage = Math.floor((this.movepage - this.starpage) / e.target.offsetHeight)
      //当前按下的index 加上移动的index
      var index = parseInt(e.target.dataset.index)  + currpage
      if(index<0){
        currpage = 0
      }
      this.keydwn(index)

    },
    switchSinger(id){
      this.$router.push({path:`/singer/detail/${id}/singer`})

    }
    
  },
  watch:{
    requset(nv){
      //$nextTick回调在元素加载后执行
      //计算每一个元素距离上边的距离
      this.$nextTick(()=>{
        this.$refs.iscroll.forEach((value)=>{
          this.iscroll.push(value.offsetTop)
        })
      })
    },
    firsttitle(){
       this.$nextTick(()=>{
       this.firsttitleY = this.$refs.firsttitle.offsetHeight
      })
    }


  },
  created(){
    // console.log('创建')
    getallLetter()
    .then((data)=>{
      this.letter =data.letter
      this.requset = data.data
      // console.log(data)
    })
    
  },
  mounted(){
    //滚动到哪一个区域 导航选中哪一个区域
    this.$refs.scrollview.scrolling((y)=>{
      this.iscrollpath = y
      // console.log(this.iscrollpath)
    // 第一个区域
      if(y >=0){
        this.currentindex = 0
        return
      }
      //中间区域 如果滚动距离大于 这个区域并且小于下一个区域 则是当前区域
      for (let i = 0; i < this.iscroll.length -1; i++) {
          let firstpathY = this.iscroll[i] 
          let lastpathY = this.iscroll[i+1]
          let currentoffsetpath = 0   
          //计算推动动画 滚动距离加上下一组的宽高     
          let switchY =  y+ lastpathY
          if(switchY >0 &&switchY < this.firsttitleY){
            currentoffsetpath = switchY - this.firsttitleY
            // console.log(currentoffsetpath)
          }else{
            currentoffsetpath = 0
          }
          // console.log(currentoffsetpath)
          // this.$refs.firsttitle.style.transform = `translateY(${currentoffsetpath}px)`
          // console.log(this.$refs.firsttitle.style.transform)

          if(-y >= firstpathY && -y<= lastpathY){
            this.currentindex = i 
            // console.log(firstpathY,lastpathY)
            return
          }
            this.currentindex = this.iscroll.length-1
          
      }
    })
  }
}
</script>


<style lang="scss" scoped>
.singer-warpper{
 position: fixed;
  overflow: hidden;
  top: 180px;
  left: 0;
  right: 0;
  bottom: 0;
}
.singer{
 
  .nav{
    position: fixed;
    right: 0;
    top: 220px;
    li{
      padding: 5px 0;
      text-align: center;
      &.active{
        text-shadow: 0 0 10px #000;
      }

    }
   
  }
  .letter{
    
    h2{
      background:  red;
      padding: 10px 20px;
      color: #fff;
    }
    
  }
  .singers {
  
    li{
    display: flex;
    height: 220px;
    align-items: center;
    .imgru{
        margin-left: 5%;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      span{
        margin-left: 5%;
        display: flex;
        font-size: 32px;
      }
    }
  }
   .top-nav{
    position: fixed;
    overflow: hidden;
    top: 180px;
    left: 0;
    right: 0;
    background:  red;
    padding: 10px 20px;
    color: #fff;
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
