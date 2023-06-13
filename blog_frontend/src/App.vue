<template>
  <Header @searchData="printSearch($event)"/>
  <router-view searchContent/>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  props:['changeHeader'],
  components: {
    Header,
    searchContent:[]
    
  },
  created(){
    this.$store.commit('initializeStore')
    console.log(this.$store.state.isAuthenticated)
  },
  methods:{
    updateHeader(){
      this.$router.go(0)
    },
    printSearch(data){
      
      this.searchContent = data
    }
  }
}
</script>

<style>
a{
  
  color: #0dcaf1;
  text-decoration: inherit;
}
</style>
