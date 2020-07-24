<template>
  <div>
    <div class="header" @click="changeTheme">
      <div class="header-left"></div>
      <div class="header-title">网易云音乐</div>
      <div class="header-right" @click.stop="personal"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    personal(){
      console.log('ssss')
      this.$router.push({
        path:'/personal'
      })
    },
    changeTheme () {
      this.index++
      if (this.index >= this.theme.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.theme[this.index])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable.scss";
  @import "../assets/css/mixin.scss";
.header {
  width: 100%;
  height: 100px;
  @include bg_color();
  // position: relative;
  // z-index: 999;
  display: flex;
  justify-content: space-between;
}
 .header-left, .header-right{
    width: 84px;
    height: 84px;
    // background: #000;
    margin-top: 8px;

}
.header-left{
  @include bg_img('../assets/images/logo');
}
.header-right{
  @include bg_img('../assets/images/account')
}
.header-title{
   text-align: center;
   line-height: 100px;
   color: #fff;
   font-weight: 300;
   @include font_size($font_medium);

}
</style>
