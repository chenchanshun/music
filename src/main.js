import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  //导入 注册 加载 完后就可以用了 用法就是 将src替换为v-lazy
  //loading就是占位图片 占位没加载出来的图片
  loading:require('./assets/images/loading.png')
})
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
