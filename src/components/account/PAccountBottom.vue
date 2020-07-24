<template>
  <scrollview>
     <list  :songs=" switchnum === 0 ? favoriteslist :hisotry "></list>
     </scrollview>
</template>

<script>
import list from '../../components/play/list'
import scrollview from '../../components/scrollview'
import {mapGetters} from 'vuex'
export default {
    name:'PAccountBottom',
    components:{
        list,
        scrollview
        
    },
    props:{
        switchnum:{
            type:Number,
            default:0,
            required:true
        }
    },
    methods:{
      
    },
     computed:{
        ...mapGetters([
            'favoriteslist',
            'hisotry'
        ])
    }
}
</script>

