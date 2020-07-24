<template>
<transition
   :css="false"
   @enter="enter"
   @leave="leave"

   >
  
      <div class="play-warpper" v-show="this.isShowPlayerList">
        <div class="play-top">
          <div class="top-left">
              <div class="mode loop" @click="modefn()" ref="minimode" ></div>
              <p v-if="this.isModeType == 0">顺序播放</p>
              <p v-else-if="this.isModeType == 1">单曲循环</p>
              <p v-else-if="this.isModeType == 2" >随机播放</p>

          </div>
          <div class="top-right">
              <div class="del" @click="delAll"></div>
          </div>
         </div>
        
        <div class="play-middle">
            <ScrollView ref="ScrollView">
                <ul ref="play">
                    <li class="item" v-for="(value,index) in songs" :key="value.id" @click="selectMusic(index)">
                        <div class="item-left">
                            <div class="item-play" @click.stop="isShowPlayer" v-show="currentindex === index"></div>
                            <p>{{value.name}}</p>
                        </div>
                        <div class="itme-right">
                            <div class="favorite" @click.stop="favor(value)" :class="{'active':isfavor(value)}" ></div>
                            <div class="item-del" @click.stop="del(index)"></div>

                        </div>

                    </li>

                </ul>
            </ScrollView>
        </div>
        <div class="play-bottom">
            <p @click="shutdown">关闭</p>
        </div>
    
     </div>
   
  
</transition>
</template>

<script>
import ScrollView from'../scrollview'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters,mapActions} from 'vuex'
import mode from '../../store/modetype'
export default {
  name:'playlist',
  components:{
      ScrollView
  },
  computed:{
      ...mapGetters([
          'songs'
      ])
  }
  ,
  computed:{
      //共享全局属性
      ...mapGetters([
          'isShowPlayering',
          'isModeType',
          'isShowPlayerList',
          'currentsong',
          'songs',
          'currentindex',
          "favoriteslist",
          'hisotry'

      
      ])
  },
  watch:{
     isShowPlayering(newValue,oldValue){
         if(newValue){
             console.log(this)
              this.$refs.play.classList.add('active')
         }else{
              this.$refs.play.classList.remove('active')
         }
     },
     isModeType(newValue,oldValue){
         
         //监听全局变量变换以增删类名
            if( newValue == mode.loop){
             this.$refs.minimode.classList.remove('random')
             this.$refs.minimode.classList.add('loop')

          }else if(newValue == mode.one){
             this.$refs.minimode.classList.remove('loop')
             this.$refs.minimode.classList.add('one')
 
          }else if(newValue == mode.random){
             this.$refs.minimode.classList.remove('one')
             this.$refs.minimode.classList.add('random')
          }
     },
     isShowPlayerList(newValue,oldValue){
         if(newValue){
             this.$refs.ScrollView.refresh();
         }
     },
     
  },
  methods:{
      //共享全局方法
      ...mapActions([
          'setShowPlayering',
          'setModeType',
          'setListType',
          'setcurrentplay',
          'setminiplayer',
          'setfavorites',
          'sethisotry'
          
      ]),
      favor(value){
      this.setfavorites(value)
      console.log(value)
    },
      isfavor(curfavor){
      let result = this.favoriteslist.find(function(currentValue){
        return currentValue.id === curfavor.id
      })
      return result
    },
      modefn(){
          //监听点击事件 切换全局变量
               if( this.isModeType === mode.loop){
              this.setModeType(mode.one)
             console.log(this.isModeType)

          }else if(this.isModeType === mode.one){
              this.setModeType(mode.random)
             console.log(this.isModeType)


          }else if(this.isModeType === mode.random){
              this.setModeType(mode.loop)
             console.log(this.isModeType)
          }
     },
      show(){
          this.iShow = true
      },
      shutdown(){
          this.setListType(false)
          this.setminiplayer(true)
      },
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
    isShowPlayer(){
       this.setShowPlayering(!this.isShowPlayering);
       console.log(this.isShowPlayering)
    },
     ...mapActions([
        'delsongs'
    ]),
    del(id){
        console.log(id)
        this.delsongs(id)
    },
    delAll(){
        this.delsongs();
    },
    selectMusic(index){
        this.setcurrentplay(index)
        console.log('历史')
        // let currhisotry = JSON.stringify(this.currentsong)
        // window.localStorage.setItem('hisotry',currhisotry)
        // this.sethisotry(this.currentsong)
        // console.log(this.hisotry)

    }
   
    
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
   
  .play-warpper{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      @include bg_sub_color();
      justify-content: space-between;
     .play-top{
        display: flex;
        width: 100%;
        height: 100px;
      justify-content: space-between;

     .top-left{
        display: flex;
        align-items: center;
        padding: 0 20px;
        .mode{
         &.loop{
          @include bg_img('../../assets/images/small_loop');
         }
         &.one{
          @include bg_img('../../assets/images/small_one');
         }
         &.random{
          @include bg_img('../../assets/images/small_shuffle');
         }
          margin-right: 20px;
          width: 56px;
          height: 56px;
      }
    }
    .top-right{
        display: flex;
        
    .del{
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/small_del'); 
      }     
    }
   }
   .play-middle{
      display: flex;
      height: 700px;
      overflow: hidden;
      ul{
      &.active{
       .item{
           .item-left{
               .item-play{
                     
                     @include bg_img('../../assets/images/small_pause')
               }
           }
       }
                
              
           
       }
      }
       .item{
           border-bottom: 1px solid #ccc;
           display: flex;
           justify-content: space-between;
           align-items: center;
           width: 100%;
           height: 100px;
           box-sizing: border-box;
           .item-left{
               display: flex;
               align-items: center;
               padding: 0 20px;
             .item-play{
                 width: 54px;
                 height: 54px;
                 margin-right: 20px;
                  @include bg_img('../../assets/images/small_play');
               
             }
             p{
                 @include font_size($font_medium_s);
                 @include font_color();

             }
           }
           
           .itme-right{
               display: flex;
               height: 100px;
               align-items: center;
               .favorite{
                   width: 54px;
                   height: 54px;
                  @include bg_img('../../assets/images/small_un_favorite');
                  &.active{
                  @include bg_img('../../assets/images/small_favorite');
                  }
               }
                .item-del{
                   width: 52px;
                   height: 52px;
                  @include bg_img('../../assets/images/small_close');

               }
           }
       }
       
   }
   .play-bottom{
       width: 100%;
       height: 100px;
       background-color: red;
       p{
           text-align: center;
           line-height: 100px;
           color: #fff;
           @include font-size($font_medium);
          

       }
   }
   
  }
</style>