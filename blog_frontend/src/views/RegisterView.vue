<template>
  
<div class="content-section">
    <form @submit = 'registerUser'>
       <fieldset class="form-group">
        <legend class="border-bottom mb-4">Join Today</legend>
       </fieldset> 
    <div class="mb-3">
        <label  class="form-label">Username</label>
        <input type="text" class="form-control" required v-model="username">
    </div>

    <div class="mb-3">
        <label  class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" required aria-describedby="emailHelp" v-model="email">
    </div>

  <div class="mb-3">
    <label class="form-label">Password</label>
    <input type="password" class="form-control" v-model="password1">
  </div>
  <div class="mb-3">
    <label  class="form-label">Password confirmation</label>
    <input type="password" class="form-control" v-model="password2">
  </div>
  <button type="submit" class="btn btn-outline-info mb-3" >Submit</button>
    </form>
    <div v-if="errors.length" class="mt-3">
      <div v-for="error in errors" :key="error">
        <p class="error-msg">{{error}}</p>
      </div>
    </div>
    <div class="border-top pt-3">
        <small class="text-muted">Already Have An Account?</small> <router-link to="login" class="ml-2 link">Sign In</router-link>
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
      email:'',
      password1:'',
      password2:'',

      errors:[]
    }
  },
  created(){
    window.document.title='Register'
  },
  methods:{
    async registerUser(e){
      e.preventDefault()
      if (this.password1 != this.password2){
        this.errors.push("The two password fields didn't match")
      }
      else{
        const formdata = {
            username:this.username,
            email:this.email,
            password:this.password1,
          }
        try {
          const response = await axios.post("http://localhost:8000/user/register/",formdata)
          if (response.data =="Duplicate User already exists"){
            this.errors.push(response.data)

          }else{
            this.$router.push('login')
          }

        } catch (error) {
          console.log(error)
        }
      }  
        
      
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
</style>