<template>
  <div>
    <div class="header" @click="changeTheme">
      <div class="header-left" @click.stop="back"></div>
      <div class="header-title">
        <ul>
          <li :class="{'active':this.currtype == 0}" @click.stop="setcurrtype(0)">我喜欢的</li>
          <li :class="{'active':this.currtype == 1}" @click.stop="setcurrtype(1)">最近听的</li>
        </ul>
      </div>
      <div class="header-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PAccountHeader',
  data: function () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0,
      currtype:0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.theme.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.theme[this.index])
    },
    back(){
      //返回上一级
      window.history.back();
    },
    setcurrtype(curr){
      this.currtype = curr
      this.$emit('setcurrtype',curr)
    }
  },
  props:{
    title:{
      type:String,
      default:''
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable.scss";
  @import "../../assets/css/mixin.scss";
.header {
  width: 100%;
  height: 100px;
  @include bg_color();
  position: relative;
  z-index: 999;
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
  @include bg_img('../../assets/images/back');
}
.header-right{
  @include bg_img('../../assets/images/more')
}
.header-title{
   text-align: center;
  //  line-height: 100px;
   color: #fff;
   font-weight: 300;
  //  @include font_size($font_medium);
  // @include no-wrap();
  ul{
    display: flex;
    border: 1px solid #fff;
    height: 60px;
    line-height: 60px;
    margin-top: 20px;
    justify-content: space-between;
    border-radius: 10px;
    li{
      padding: 0 30px;
      border-radius: 5%;
      &:nth-of-type(1){
        border-right: 1px solid #fff;
      }
      &.active{
        background:rgba(255,255,255,0.3);
      }
    }
  }
}
</style>
