<template>
    <div class="content-section">
        <form @submit.prevent = 'loginUser'>
           <fieldset class="form-group">
            <legend class="border-bottom mb-4">Log In</legend>
           </fieldset> 
        <div class="mb-3">
            <label  class="form-label">Username*</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required v-model="username">
        </div>
      <div class="mb-3">
        <label class="form-label">Password*</label>
        <input type="password" class="form-control" required v-model="password">
      </div>
      <button type="submit" class="btn btn-outline-info mb-3" >Login</button>
        </form>
        <div v-if="errors.length" class="mt-3">
          <div v-for="error in errors" :key="error">
            <p class="error-msg">{{error.detail}}</p>
          </div>
        </div>
        <div class="border-top pt-3">
            <small class="text-muted">Don't Have An Account?</small> <router-link to="register" class="ml-2 link btn-outline-info">Sign Up Now</router-link>
        </div>
    </div> 
    </template>
    
    <script>
import axios from 'axios'

    export default {
      name:'RegisterView',
      data(){
        return{
          username:'',
          password:'',
          token:'',
          errors:[]
        }
      },
      created(){
        document.title='Log In'
      },
      methods:{
        async loginUser(){
         
          sessionStorage.removeItem('access')
        sessionStorage.removeItem('refresh')
         const formdata = {
            username:this.username,
            password:this.password
         }
        const response = await axios.post("http://localhost:8000/api/token/",formdata)
        const response_data = response.data
        console.log(response_data)
         sessionStorage.setItem('access',response_data.access)
         sessionStorage.setItem('refresh',response_data.refresh)
         console.log(response_data.access)
         this.$store.commit('loginUser',response_data.access)
         this.$router.replace({name:'home'})
         this.$router.go(-1)
        }
      }
    }
    </script>
    
    <style>
    .content-section{
        margin: auto;
        width: 50%;
    }
    .error-msg{
      color: crimson;
    }
    .link{
      text-decoration: inherit;
      color: rgb(13,202,240);
    }
    </style>