import loading from '../plugin/loading'
// import Vue from 'vue'
export default{
    install:function(Vue,options){
        // Vue.component(loading.name,loading)
        //1.创建一个extend的构造函数
        let loadingcontructor = Vue.extend(loading)
        //2.利用构造函数创建一个实例对象
        let loadinginstance = new loadingcontructor()
        //3.创建一个标签(元素)
        let Odiv = document.createElement('div')
        //4.将元素添加到页面
        document.body.appendChild(Odiv)
        //5.将实例挂载到元素上
        loadinginstance.$mount(Odiv)
        if(options&&options.title !== null&&options.title !== undefined){
            loadinginstance.title = options.title
        }
        Vue.showLoading = function(){
            loadinginstance.isShow = true
        }
        Vue.hiddenLoading = function(){
            loadinginstance.isShow = false
        }
        Vue.prototype.$showLoading = function(){
            loadinginstance.isShow = true
        }
        Vue.prototype.$hiddenLoading = function(){
            loadinginstance.isShow = false
        }
    }
}