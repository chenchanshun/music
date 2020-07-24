import {SET_FULL_SCREEN ,
        SET_MINI_PLAYER,
        SET_SHOW_PLAYERING,
        SET_MODE_TYPE,
        SET_LIST_TYPE,
        SET_SONS_LIST,
        SET_LYRIC,
        GET_TYPE,
        GET_ID,
        LYRIC_ISSHOW,
        DELENT_SONGS,
        SET_CURRENT_PLAY,
        SET_CURRENT_TIME,
        SET_FAVORITES,
        SET_FAVORITES_LIST,
        HISOTRY
        
    
    } from './mutations-type'
export default{
    // changeFullscreen(state,flag){
    //  state.isfullScreen = flag
    // }
    SET_FULL_SCREEN (state,flag){
        state.isfullScreen = flag
        if(flag){
            state.isShowminiplayer = false,
            state.isShowPlayerList = false
        }
    },
    SET_MINI_PLAYER (state,flag){
    state.isShowminiplayer = flag
    if(flag){
        state.isfullScreen = false,
        state.isShowPlayerList = false
    }
    },
    SET_SHOW_PLAYERING (state,flag){
        state.isShowPlayering = flag
    },
    SET_MODE_TYPE(state,flag){
        state.isModeType = flag
    },
    SET_LIST_TYPE(state,flag){
        state.isShowPlayerList = flag
        if(flag){
            state.isfullScreen = false,
            state.isShowminiplayer = false
        }
    },
    SET_SONS_LIST(state,list){
        state.songs = list
    },
    SET_LYRIC(state,lyrics){
        state.Lyrics = lyrics
    },
    GET_TYPE(state,type){
        state.lyricstype = type
    },
    GET_ID(state,id){
        state.lyricsDetailId = id
    },
    LYRIC_ISSHOW (state,type){
    state.lyricsIsshow = type
    },
    DELENT_SONGS(state,index){
        if(index !== undefined){
        state.songs.splice(index,1)
        }else{
            state.songs = [];
        }
        //删除的索引是当前索引前的歌曲时 让当前索引减一
        if(index < state.currentindex){
            state.currentindex = state.currentindex-1
        }
        if(state.songs.length === 0){
            state.isfullScreen  =  false,
            state.isShowminiplayer = false,
            state.isShowPlayerList = false
        }
    },
    SET_CURRENT_PLAY(state,index){
        if(index < 0){
            index =  state.songs.length - 1
            console.log('倒数第一首'+state.songs.length)
        }else if(index > state.songs.length - 1){
            index = 0
            console.log('第一首'+state.currentindex)
        }
            state.currentindex = index
        

    },
    SET_CURRENT_TIME(state,time){
        state.curTime = time
    },
    SET_FAVORITES(state,curr){
        if(curr == undefined){return}
        let result = state.favoriteslist.find(function(currentValue){
           return  currentValue.id == curr.id
        })
        console.log(result)
        if(result == undefined){
            console.log(state.favoriteslist)
            state.favoriteslist.push(curr)
        }else{
            state.favoriteslist.pop(curr)
        }

    },
    SET_FAVORITES_LIST(state,list){
        state.favoriteslist = list
    },
    HISOTRY(state,hisotry){
        if(hisotry== null){return}
        let result = state.hisotry.find(function(currentValue){
            return  currentValue.id == hisotry.id
         })
         console.log(result)
         if(result == undefined){
            //  console.log(state.hisotry)
             state.hisotry.push(hisotry)
         }
    },
    HISOTRYLIST(state,list){
        state.hisotry = list
    }
    
        
    


}