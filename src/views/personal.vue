<template>
 <transition appear>
  <div class="person">
    <accountheader @setcurrtype = setcurrtype></accountheader>
    <accountbottom :switchnum= switchs ></accountbottom>
  </div>
  </transition>
</template>

<script>
import accountheader from '../components/account/PAccountHeader'
import accountbottom from '../components/account/PAccountBottom'
export default {
    name:'personal',
    data:function(){
        return{
            songs:[],
            switchs:0
        }
    },
    components:{
        accountheader,
        accountbottom
        
    },
    methods:{
        setcurrtype(num){
            console.log(num)
            this.switchs = num
        }
    }
   
    
}
</script>

<style lang="scss" scoped>
    .person{
        width: 100%;
        height: 100%;
        background: #fff;
        position: fixed;
        top: 0;
        overflow: hidden;
    }
    .v-enter{
        transform: translateX(100%);

    }
    .v-enter-active{
        transition: transform 1s;
        
    }
    .v-enter-to{
        transform: translateX(0%);
        
    }
    .v-leave{
        transform: translateX(0%);
    }
    .v-leave-active{
        transition: transform 1s;

    }
    .v-leave-to{
        transform: translateX(100%);
    }

</style>