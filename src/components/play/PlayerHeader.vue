<template>
  <div>
    <div class="header">
      <div class="header-left" @click.stop="hiddplaylist"></div>
      <div class="header-title">
        <h3>{{currentsong.name}}</h3>
        <p>{{currentsong.songs}}</p>
      </div>
      <div class="header-right" ></div>
    </div>
  </div>
</template>

<script>

import { mapActions,mapGetters} from 'vuex'

export default {
  name: 'SubHeader',
  data: function () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },  
      computed:{
      ...mapGetters([
          'currentsong'
      ])
  
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
    ...mapActions([
          'setFullScreen',
          'setminiplayer'
        ]),
    hiddplaylist(){
    this.setFullScreen(false),
    this.setminiplayer(true)
    },

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
  // @include bg_color();
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
  @include bg_img('../../assets/images/back');
}
.header-right{
  @include bg_img('../../assets/images/more')
}
.header-title{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
   text-align: center;

   color: #fff;
  //  font-weight: 300;
   @include font_size($font_medium_s);
  @include no-wrap();

}
</style>
