import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  //用于全局修改的数据

    state:state,
    mutations:mutations,
    actions:actions,
    getters:getters

  // state: {
  //   isfullScreen : false
  // },
  // //用于修改和保存全局共享数据的方法
  // mutations: {
  //   changeFullscreen(state,flag){
  //     state.isfullScreen = flag

  //   }
  // },
  // //actions用于保存触发mutations中保存的方法
  // // 界面触发actions，actions触发mutations,mutations又改变state中的数值，又反应到界面上
  // actions: {
  //   setFullScreen({ commit },flag){
  //     commit('changeFullscreen',flag)
  //   }
  // },
  // modules: {
  // },
  // //用于获取保存的数据
  // getters:{
  //   isfullScreen(state){
  //     return state.isfullScreen
  //   }
  // }
})
