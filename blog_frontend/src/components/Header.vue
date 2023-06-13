<template>
<div class="container">
  <header class="site-header">
  <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
    <div class="container">
      <router-link  to="/"  class="navbar-brand mr-4">Django Blog</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggle">
        <div class="navbar-nav mr-auto">
          <a href="/" class="nav-item nav-link">Home</a>
          <router-link to="about"   class="nav-item nav-link">About</router-link>
        </div>

        <div class="mx-auto">
          <form @submit.prevent="performSearch()">
            <label for="search" >Search</label>
            <input type="text" name="search" id="search" v-model="search">
          </form>
        </div>

       <b class="mx-auto"></b>
       
        <!-- Navbar Right Side -->
       
        <div class="navbar-nav navbar-right-side mx-auto ">
         
          <a v-show="!isAuthenticated" href="/login" class="nav-item nav-link">Login</a>
          <a v-show="isAuthenticated" href="/post/new/" class="nav-item nav-link"><i class="fa-regular fa-plus"></i> New Post</a>
          <a v-show="isAuthenticated" href="/profile" class="nav-item nav-link"><i class="fa-regular fa-user"></i> Profile</a>
          <a v-show="isAuthenticated" @click="logoutUser" class="nav-item nav-link"><i class="mr-3 fa fa-sign-out"></i> Logout</a>
          <a v-show="!isAuthenticated" href="/register" class="nav-item nav-link">Register</a>
      
        </div>
      </div>
    </div>
  </nav>
</header>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      isAuthenticated:null,
      search:''
      
    }
  },
  created(){
    this.$store.commit('initializeStore')
    this.isAuthenticated = this.$store.state.isAuthenticated
  },
  methods:{
    logoutUser(){
      this.$store.commit('logoutUser')
      this.$router.go(0)
    },
    async performSearch(){
      const request = await axios.get(`http://localhost:8000/post/?query=${this.search}`)
      this.$emit('searchData',request.data)
    }

  },
  watch:{
    
  
  }
}
</script>

<style scoped>
.nav-item.nav-link{
  cursor :pointer;
}

</style>