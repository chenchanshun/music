import Vue from 'vue'
import VueRouter from 'vue-router'
// import Dtail from '../views/Dtail'
// import Home from '../views/Home.vue'
// 注意点:通过 improt xxx from xxx 的方式加载组件,无论有没有用到,
// 都会被加载进来
// import Recommen from '../views/recommen'
// import Search from '../views/search'
// import Singer from '../views/singer'
// import Rank from '../views/rank'

// 实现vue组件的按需加载

const Recommen = resolve => {
  import('../views/recommen').then(module => {
    resolve(module)
  })
}
const Search = resolve => {
  import('../views/search').then(module => {
    resolve(module)
  })
}
const Singer = resolve => {
  import('../views/singer').then(module => {
    resolve(module)
  })
}
const Rank = resolve => {
  import('../views/rank').then(module => {
    resolve(module)
  })
}
const Detail = resolve => {
  import('../views/Dtail').then(module => {
    resolve(module)
  })
 
}
const personal = resolve => {
  import('../views/personal').then(module => {
    resolve(module)
  })

}

// const lyricsDetail = resolve => {
//   import('').then(module => {
//     resolve(module)
//   })
// }
// import lyricsDetail from '../components/lyrics'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/recommen' },
  { path: '/recommen', 
   children:[
     {
      path: 'detail/:id/:type',
      component:Detail,
      
     },
    ],
     
 
   component: Recommen },
  { path: '/search', component: Search },
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/personal', component: personal }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
export default router
