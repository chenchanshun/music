export default{
    isfullScreen(state){
        return state.isfullScreen
     },
     isShowminiplayer(state){
        return state.isShowminiplayer
     },
     isShowPlayering(state){
        return state.isShowPlayering
     },
     isModeType(state){
      return state.isModeType
   },
   isShowPlayerList(state){
      return state.isShowPlayerList
   },
   songs(state){
      return state.songs
   },
   currentsong(state){
      let obj = {
         name:'',
         songs:'',
         picUrl:null,
         url:null
      }
      if(state.songs.length !==  0){
         console.log(state.songs[state.currentindex])
         return state.songs[state.currentindex];
      }else{
         return obj
      }
    },
   currentLyric(state){
      return state.Lyrics
   },
 
   lyricsIsshow(state){
      return state.lyricsIsshow
   },
   currentindex(state){
      return state.currentindex
   },
   currTime(state){
      return state.curTime
   },
   favoriteslist(state){
      return state.favoriteslist
   },
   hisotry(state){
      return state.hisotry
   },
   hisotrylist(state){
      return state.hisotrylist
   }
   
   
}