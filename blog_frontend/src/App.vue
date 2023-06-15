<template>
  <Header @searchData="printSearch($event)"/>
  <router-view />
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    searchContent:''
    
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
      
      this.searchContent=data
      console.log(this.searchContent)
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
