<template>
  <div class="rank">
    <div class="rank-warpper">
       <iscrollview>
    <ul class="rank-titel">
      <li class="titel" v-for="(value,index) in ranking.titles" :key="index">
           <p class="title-top"> {{value}}</p>
        <ul class="rank-dtail" v-if="value == '官方榜'">

          <li v-for="key in ranking[index]" :key="key.id" >

           <div class="dtail" @click="getrangk(key.rank.id)">
            <div class="dtail-left">
            <img :src="key.rank.coverImgUrl" alt="" srcset="">
            <p>{{key.rank.updateFrequency}}</p>
            </div>
            <div class="dtail-right">
              {{key.rank.description}}
            </div>
           </div>

          </li>
        </ul>
        <ul class="rank-dtail-off" v-else-if="index !== 'globalList'">
           <li class="dtail-off"  v-for="key in ranking[index]" :key="key.id" @click="getrangk(key.rank.id)" >
             <!-- {{key}} -->
              <img :src="key.rank.coverImgUrl" alt="" srcset="">
              <p>{{key.rank.updateFrequency}}</p>  
              <p >{{key.name}}</p>  
           </li>
        </ul>
        <!-- <ul class="rank-dtail-off" v-else>
           <li class="dtail-off" v-for="key in ranking[index]" :key="key.id" @click="getrangk(key.rank.id)" >
              <img :src="key.rank.coverImgUrl" alt="" srcset="">
              <p>{{key.rank.updateFrequency}}</p>
              <p>{{key.rank.name}}</p>
           </li>
        </ul> -->
      </li>
      
    </ul>
 </iscrollview>
    </div>
    <transition>
       <router-view></router-view>
     </transition>
  </div>
</template>

<script>
import {getrank} from '../api/index'
import iscrollview from '../components/scrollview'
export default {
  name: 'rank',
  data:function(){
    return{
      ranking:{}
    }
  },
  components:{
    iscrollview
  },
  methods:{
    getrangk(id){
      this.$router.push({path:`/rank/detail/${id}/rank`})
      console.log(id)
    }
  },
  created(){
    getrank()
    .then((data)=>{
      this.ranking = data
      console.log(data)
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }
}
</script>

<style lang="scss" scoped>
.rank-warpper{
  position: fixed;
    top: 180px;
    left: 0;
    bottom: 0;
    overflow: hidden;
}
 .rank{
    
   .rank-titel{
     right: 0;
     .titel{
       font-size: 28px;
       text-align: left;
       color: #949494;
       font-weight: bolder;
       .title-top{
         margin-left: 20px;
       }
       .rank-dtail{
         margin-left: 20px;
       .dtail{
         width: 100%;
         display: flex;
         .dtail-left{
         position: relative;
          display: flex;
          // width: 100%;
          flex-grow: 1;
           img{
             width: 200px;
             height: 200px;
             padding: 20px 0;
            //  margin-left: 50px;
           }
           P{
             display: block;
             position: absolute;
             bottom: 30px;
             left: 10px;
             color: #ffffff;
           }
          }
          .dtail-right{
             display: flex;
             width: 100%;
             flex-grow: 5;
             padding: 20px 0;
             margin-right: 40px;
             font-weight: 400;
             color: black;
             margin-left: 20px;
          }
         
         }
        
       }
         .rank-dtail-off{
              display: flex;
              flex-wrap: wrap;
              box-sizing: border-box;
             margin-bottom: 30px;
              
            .dtail-off{
              position: relative;
              padding: 20px 20px;
                img{
                  width: 200px;
                  height: 200px;
                  border-radius: 20px;

                }
                p{
                 padding: 20px 20px;
                  position: absolute;
                  bottom: 10px;
                  left: 10px;
                  color: #ffffff;
                  
                }
                p:nth-of-type(2){
                    color: rgb(12, 12, 12);
                    position: absolute;
                    top: 200px;
                    font-weight: 600;
                    font-size: 26px;
                }
            }
          }
      
          
            
     }
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
