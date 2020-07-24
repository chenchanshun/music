<template>
  <div class="personalized" >
    <div class="personalized-top">
      <h3>{{title}}</h3>
    </div>
    <div class="personalized-list">
      <div class="itme" v-for="value in result" :key="value.id" @click="selectitme(value.id)">
        <!-- <img :src="value.picUrl" alt=""> -->
        <img v-lazy="value.picUrl" alt="">
        <p>{{value.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalized",
  props: {
    result: {
      type: Array,
      //默认值为空数组
      default: () => [],
      //必定要传输
      required: true
    },
    title:{
      type:String,
      default:''
    },
      type:{
      type:String,
      default:''
    }
  },
  methods:{
    selectitme(id){
      console.log(id)
      this.$emit('select',id,this.type)


    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';
@import '../assets/css/variable';
.personalized{
  @include bg_sub_color();
  .personalized-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    padding: 0 20px;
    border-bottom: 1px solid #fff;
    @include bg_sub_color();
    h3{
      @include font_size($font_large);
      font-weight:bold;
      @include font_color();
    }
  }
  .personalized-list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
  }
  .itme{
    width: 200px;
    padding-bottom: 20px;
    img{
      width: 200px;
      height: 200px;
      border-radius: 20px;
    }
    p{
      @include font_size($font_medium_s);
      @include clamp(2);
      @include font_color();
      text-align: center;

    }
  }
}
</style>

