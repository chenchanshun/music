// 这个文件就是专门用来管理请求各种接口地址的
import network from './network'
export const getBanner = () => network.get('banner?type=2')
export const getpersonalized = () => network.get('personalized?limit=6')
export const getnewAlbum = () => network.get('/album/newest')
export const getnewSong = () => network.get('/personalized/newsong')
export const getplaylist = (data) => network.get('/playlist/detail',data)
export const getnAlbum = (data) => network.get('/album',data)
export const getnSongDetail = (data) => network.get('/song/detail',data)
export const getCurrentLyics = (data) => network.get('/lyric',data)
export const getSong = (data) => network.get('/song/url',data)
export const getsinger = (data) => network.get('/artists',data)
export const getrankDtail = (data) => network.get('/top/list',data)
export const getsearch= (keywords) => network.get('/search/suggest',keywords)
export const getPopularrecom= () => network.get('/search/hot/detail')


export const getPopSinger =()=>{
    return new Promise(function(relove,reject){
    network.get('/top/artists?offset=0&limit=5')
    .then((data)=>{
        relove(data.artists)
    })
    .catch((data)=>{
        reject(data)
    })
 })
}
export const getLetterSinger =(letter)=>{
    return new Promise(function(relove,reject){
    network.get(`/artist/list?type=-1&limit=30&area=7&initial=${letter}`)
    .then((data)=>{
        relove(data.artists)
    })
    .catch((data)=>{
        reject(data)
    })
 })
}
export const getallLetter = function(){    
    return new Promise(function(reolve,reject){
        let listrequset = [getPopSinger()]
        var stringlist = ['热']
        for (let i = 65; i < 91; i++) {
        var string = String.fromCharCode(i) 
        listrequset.push(getLetterSinger(string))
        stringlist.push(string)
        
    } 
        network.all(listrequset)
        .then((data)=>{
           let obj = []
            obj.data = data
            obj.letter = stringlist
            reolve(obj)
        })
    })
    

}
export const getrank = function(){
    return new Promise(function(relove,reject){
        let category = {
            officialList: [
              { name: '云音乐飙升榜', id: 3 },
              { name: '云音乐新歌榜', id: 0 },
              { name: '网易原创歌曲榜', id: 2 },
              { name: '云音乐热歌榜', id: 1 }
            ],
            recList: [
              { name: '云音乐说唱榜', id: 23 },
              { name: '云音乐电音榜', id: 25 },
              { name: '云音乐欧美新歌榜', id: 32 },
              { name: '抖音排行榜', id: 26 },
              { name: '云音乐ACG音乐榜', id: 22 },
              { name: '云音乐古典音乐榜', id: 24 }
            ],
            globalList: [
              { name: '美国Billboard周榜', id: 6 },
              { name: 'UK排行榜周榜', id: 5 },
              { name: 'Beatport全球电子舞曲榜', id: 21 },
              { name: '日本Oricon周榜', id: 10 },
              { name: 'iTunes榜', id: 8 },
              { name: '英国Q杂志中文版周榜', id: 29 }
            ],
            otherList: [
              { name: 'KTV唛榜', id: 7 },
              { name: '法国 NRJ Vos Hits 周榜', id: 19 },
              { name: '新声榜', id: 27 },
              { name: '云音乐韩语榜', id: 28 },
              { name: '电竞音乐榜', id: 30 },
              { name: '云音乐欧美热歌榜', id: 31 }
            ],
            titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
           }
       network.get('/toplist')
       .then(function(data){
           let flag = false
        // console.log(data.list)
        for (const key in data.list) {
            Object.keys(category).forEach(i => {
                for (let index = 0; index < category[i].length; index++) {
                    // console.log(category[i][index],data.list[key].name)
                    if(category[i][index].name == data.list[key].name)  {
                        category[i][index].rank = data.list[key]
                        flag = true
                        break
                    }                  
                }
                
            });
                
            // console.log(category)
        }
        relove(category)
       })
       .catch(function(err){
        console.log(err)
       })
     })
}





