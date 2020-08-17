<template>
  <div id="app">
    <PlayerLyrics></PlayerLyrics>
    <Header></Header>
    <Tabbar></Tabbar>
    <!-- 指定缓存组件 -->
    <keep-alive include="search,singer">
    <router-view></router-view>
    </keep-alive>
    <secomplayer ></secomplayer>
  </div>
</template>

<script>
import{mapGetters} from 'vuex'
import Header from "./components/Header";
import Tabbar from "./components/Tabbar";
import secomplayer from "./views/secomplayer";
import PlayerLyrics  from './views/lyrics'
export default {
  name: "App",
  components: {
    Header,
    Tabbar,
    secomplayer,
    PlayerLyrics
  },
  methods: {
    myFn(data) {
      // console.log(data)
      document.documentElement.setAttribute("data-theme", data);
    },
    // getcur(data){
    //   console.log(this.currTime)
    //   console.log(data)
    // }
    
  },
  // updated(){
  //   this.getcur()
  // },
  computed:{
    
    ...mapGetters([ 
        'currTime'
    ])
    
  },
  // watch:{
  //   currTime(nValue,Ovalue){
  //     console.log('nValue')
  //   }
  // }
  
  
};
</script>
