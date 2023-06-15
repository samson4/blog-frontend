<template>
  <div class="pagination-container">
    <a v-if="next_link !=null" class="btn btn-outline-info mb-4" href="/">First</a>
    
    <div v-for="pnum in count" :key="pnum">
    <button @click="nextpage(pnum)" class="btn btn-outline-info ">{{pnum}}</button>
    </div>
    <a v-show="next_link !==null" class="btn btn-outline-info mb-4" href="#">next</a>
  </div>
  
  
</template>

<script>
import axios from 'axios'

export default {
    
    data(){
        return{
            count:0,
            prev_link:'',
            next_link:null
        }
    },
    
    methods:{
        async getPages(){
           const response = await axios.get('http://localhost:8000/')
            
            this.count = response.data.count
            this.prev_link = response.data.previous
            this.next_link =response.data.next
            
        },
        nextpage(pnum){
            this.$emit("next",pnum)
            
           
        }
    },
    created(){
        this.getPages()
    },
    

}
</script>

<style >
.pagination-container{
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
    width: 50%;

}
</style>