import axios from 'axios'
import Vue from 'vue'

// 全局配置
axios.defaults.baseURL = 'http://192.168.0.110:3000/' //本地node 部署
// axios.defaults.baseURL = 'http://musicapi.leanapp.cn' 
axios.defaults.timeout = 5000
let count = 0 //保存请求次数
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++
  console.log(count)
  Vue.showLoading() 
  return config;
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoading()
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count-- //请求响应时--
  console.log(count)
  //若请求全部响应则隐藏loading
  if(count == 0){
    Vue.hiddenLoading()
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error);
});
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
},
all:function(list){
  return new Promise(function(resolve,reject){
    axios.all(list)
    .then(axios.spread(function (...result) {
     resolve(result)
   }))
  })
}


}
