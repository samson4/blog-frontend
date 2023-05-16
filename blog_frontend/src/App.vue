<template>
  <Header/>
  <router-view/>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  props:['changeHeader'],
  components: {
    Header,
    
  },
  created(){
    this.$store.commit('initializeStore')
    console.log(this.$store.state.isAuthenticated)
  },
  methods:{
    updateHeader(){
      this.$router.go(0)
    }
  }
}
</script>

<style>

</style>
