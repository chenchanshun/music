<template>
 <!--1.导入swiper插件 -->
  <swiper :options="swiperOption" v-if="banners.length > 0">
      <!-- 4.显示数据 -->
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
        <a :href="value.url">
          <!-- <p>{{value.bannerId}}</p> -->
            <img :src="value.pic">
            <!-- <img v-lazy="value.pic"> -->
        </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "Banner",
  components: {
    Swiper,
    SwiperSlide
  },
  //  2.配置swiper
  data() {
    return {
      swiperOption: {
        loop: true, // 循环模式选项
        autoplay: {
          delay: 1000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
        },
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    };
  },
  props: {
      //3.接收数据
    banners: {
      type: Array,
      //默认值为空数组
      default: () => [],
      //必定要传输
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.item{
    img{
        width:100%;
        height:300px;
    }
}
</style>
<style lang="scss">
@import '../assets/css/mixin';
.swiper-pagination-bullet{
    width: 16px;
    height: 16px;
    background:#fff;
    opacity: 1;
}
.swiper-pagination-bullet-active{
    @include bg_color();
}
</style> 

