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
       HISOTRY,
       HISOTRYLIST
      
      } from './mutations-type'
import { getnSongDetail,
         getCurrentLyics,
         getSong } from '../api/index'
export default{
    setFullScreen({ commit },flag){
        commit(SET_FULL_SCREEN,flag)
      },
    setminiplayer({ commit },flag){
      commit(SET_MINI_PLAYER,flag)
    },
    setShowPlayering({ commit },flag){
      commit(SET_SHOW_PLAYERING,flag)
    },
    setModeType({ commit },flag){
      commit(SET_MODE_TYPE,flag)
    },
    setListType({ commit },flag){
      commit(SET_LIST_TYPE,flag)
    },
    //async 声明的函数返回本质上是一个promise
    async setSongsDetail({ commit },ids){
      // await一定会等待到返回值时才会执行下去
      // console.log(ids)
      let result = await getnSongDetail({ids:ids.join(',')})
      let song = await getSong({id:ids.join(',')})
      // console.log(song.data[0])
      // console.log(result.songs[0])
      let list =[];
      result.songs.forEach((value,index) => {
          let obj = {}
          // obj.musicurl = song.data[index].url
          for(let j = 0;j<song.data.length;j++){
            let itme = song.data[j]
            console.log(itme)

            if(itme.id ==  value.id){
              obj.musicurl = itme.url
            }
            
          }
          // console.log( song.data)
          obj.name = value.name
          let songs =''
          obj.id = value.id
          value['ar'].forEach(function(itme,index){
            if(index == 0){
              songs = itme.name
            }else{
              songs + '-'+itme.name
            }
          obj.songs = songs
          obj.url = value['al'].picUrl
          })
          list.push(obj)
          // console.log(list)
        
      });
      // console.log(list)

      commit(SET_SONS_LIST,list)
    }, 

    //歌词
    async getSongyrics({commit},id){
      // console.log(id)
      let result=  await getCurrentLyics({id:id})
      // console.log(result)
      let obj = {}
      // console.log(result.lrc.lyric)
      obj = parseLyric(result.lrc.lyric)
      // console.log(obj)
      // console.log(obj)
      commit(SET_LYRIC,obj)

  },  
  getLyricsType({ commit },type){
    commit(GET_TYPE,type)
  }, 
  getLyricsId({ commit },id){
    commit(GET_ID,id)
  },
  setlyrics({ commit },type){
    commit(LYRIC_ISSHOW,type)
  },
  
  delsongs({ commit },list){
    commit(DELENT_SONGS,list)
  },
  setcurrentplay({ commit },index){
    commit(SET_CURRENT_PLAY,index)
  },
  setcurrentTime({ commit },time){
    commit(SET_CURRENT_TIME,time)
  },
  setfavorites({commit},curr){
    commit(SET_FAVORITES,curr)
  },
  setfavoriteslist({commit},list){
    commit(SET_FAVORITES_LIST,list)
  },
  sethisotry({commit},hisotry){
    commit(HISOTRY,hisotry)
  },
  sethisotrylist({commit},list){
    commit(HISOTRYLIST,list)
  }
  
}
// 格式化歌词方法
function parseLyric(lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}