<template>
  <div class="detaildmg">
    <div class="detaildmg-top">
        <div class="detaildmg-img">
            <img :src="path" alt="">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailImg',
  props:{
      path:{
          type:String,
          default:'',
          required:true
      }
  }
}
</script>

<style lang="scss" scoped>
  .detaildmg-top{
    width: 100%;
    height: 500px;
    overflow: hidden;
    img{
      width: 100%;
      
    }
  }
</style>