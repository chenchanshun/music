<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
 import IScroll from 'iscroll/build/iscroll-probe'
export default {
 name:'scrollview',
 mounted(){
     //  $refe来获取ref标记的元素 在生命周期里
     this.iscroll = new IScroll(this.$refs.wrapper,{
          click:iScrollClick(), //调用判断函数
          mouseWheel: true,
          scrollbars: false,//显示滚动条
          //拖拽卡顿问题
          scrollX:false,
          probeType:3,
          scrollY:true,
          disablePointer:true,
          disableTouch:false,
          disableMouse:true,
          // click: true,
          taps:true,
          
         



     })
     function iScrollClick(){
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
       var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
       return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
}
    //  setTimeout(() => {
        //  在网络上渲染完数据后重新获取 iscroll滚动距离
    //    console.log(this.iscroll.maxScrollY)
    //    this.iscroll.refresh()
    //    console.log(this.iscroll.maxScrollY)

    //  },5000)
     //1.创建一个观察者对象
     //Mutaion函数只要监听到了指定元素的变化就会执行被传入的回调函数 
     //MutationList 是发生变化的数组 发生变化的元素会记录在MutationList里
     //observer就是观察者对象
     let observer = new MutationObserver((MutationList,observer) => {
        //  console.log(MutationList)
      //  console.log(this.iscroll.maxScrollY)
       this.iscroll.refresh()
      //  console.log(this.iscroll.maxScrollY)
     });
     //2.告诉观察者对象我们要观察什么内容
     //  只要子节点发生变化就更新滚动距离
     let config ={
         childList: true,  // 观察目标子节点的变化，是否有添加或者删除
         subtree: true,     // 观察后代节点，默认为 false
         attributeFilter:['height','offsetHeight' ]
     }
     //3.告诉观察者对象我们要观察谁 观察什么内容
     //第一个参数 我们要观察谁
     //第二个参数 我们观察的是什么内容
     observer.observe(this.$refs.wrapper,config)
     

 },
 methods:{
   //提供一个监听滚动距离的方法给外界使用
   scrolling(fn){
     this.iscroll.on("scroll",function(){
       fn(this.y)
     })
    
   },
    refresh(){
       setTimeout(()=>{
          this.iscroll.refresh(); 
       },100)
     }
 }

}
</script>

<style>
#wrapper {
  height: 100%;   
  width: 100%;
}
</style>