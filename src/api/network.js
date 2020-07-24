import axios from 'axios'
// 全局配置
axios.defaults.baseURL = 'http://172.20.10.2:3000/' //本地node 部署
// axios.defaults.baseURL = 'http://musicapi.leanapp.cn' 
axios.defaults.timeout = 5000

// 封装自己的get/post
export default {
  // data 发送请求可能接受的参数
 get:function(path = '',data={}){
   return new Promise(function(resolve,reject){
     axios.get(path,{
       params:data
     })
     .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    });
   })

 },
 post:function(path = '',data={}){
  return new Promise(function(resolve,reject){
    axios.post(path,data)
    .then(function (response) {
     resolve(response.data);
   })
   .catch(function (error) {
     reject(error);
   });
  })

}
}
