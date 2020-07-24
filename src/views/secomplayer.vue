<template>
  <div class="secomplay">
      <player @currents="gettime" ></player>
      <Miniplayer></Miniplayer>
      <Playlist ></Playlist>
      
  </div>
</template>

<script>

import player from '../components/play/Player'
import Miniplayer from '../components/play/miniplayer'
import Playlist from '../components/play/playlist'
export default {
  name:'play',
  data:function(){
    return{
      current:0
    }
  },
  components:{
      player,
      Miniplayer,
      Playlist
      
  },
  methods:{
    gettime(data){
      // console.log('dd')
      this.current = data
      // console.log(data)
    },
  }
  
 
  
}
</script>

<style lang="scss" scoped>

</style>