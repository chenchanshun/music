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

