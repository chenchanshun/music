<template>
  <div class="tabbar">
      <router-link class="item" tag="div" to="/recommen">
          <span>推荐</span>
      </router-link>
      <router-link class="item" tag="div" to="/singer">
          <span>歌手</span>
      </router-link>
     <router-link class="item" tag= "div" to="/rank">
          <span>排行</span>
      </router-link>
      <router-link class="item" tag="div" to="/search">
          <span>搜索</span>
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
 .tabbar{
     width: 100%;
     height: 84px;
     @include bg_sub_color();
    //  position: relative;
    //  z-index: 998;
     display: flex;
     justify-content: space-around;
 }
 .item{
     span{
         line-height: 84px;
         @include font-size($font_medium_s);
         @include font-color();
     }
 }
 .router-link-active span{
      @include font_active_color();
 }
  .router-link-active{
      border-bottom: 5px solid #000;
      @include border_color();
  }
</style>
