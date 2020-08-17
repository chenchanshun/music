<template>
  <div class="loading" v-show="isShow">
      <div class="loading-round">
      </div>
      <p>{{title}}</p>
  </div>
</template>

<script>
export default {
    name:'loading',
    data:function(){
        return{
            title:"加载中...",
            isShow: false
        }
    }
}
</script>

<style lang="scss" scoped>
.loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    // background: red;
    width: 200px;
    height: 200px;
    p{
        color: black;
        margin-top: 10px;
    }
    .loading-round{
        width: 100px;
        height: 100px;
        border: 10px solid #cccccc;
        border-radius: 50%;
        border-right-color: red;
        animation: loading 2s linear infinite;
    }
    @keyframes loading {
        from{
            transform: rotate(0deg);
        }
         to{
            transform: rotate(360deg);
         }
        
        
    }

}
    
</style>