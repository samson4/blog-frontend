<template>
 
  <div class="content-section">
  <div class="media">
    <img class="rounded-circle account-img" :src="profileImage.image_url">
    <div class="media-body">
      <h2 class="account-heading">{{profile.username}}</h2>
      <p class="text-secondary">{{profile.email}}</p>
    </div>
  </div>
  <!-- FORM HERE -->
  
    <form enctype="multipart/form-data" @submit = 'updateUser'>
       <fieldset class="form-group">
        <legend class="border-bottom mb-4">Profile Info</legend>
       </fieldset> 
    <div class="mb-3">
      <label  class="form-label">Username</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="username">
    </div>   
    <div class="mb-3">
        <label  class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email" >
    </div>
  <div class="mb-3">
    <label class="form-label">Age</label>
    <input type="text" class="form-control" v-model="age">
  </div>
  <div class="mb-3">
    <label  class="form-label">Nickname</label>
    <input type="text" class="form-control" v-model="nickname" >
  </div>
  <div class="mb-3">
    <label  class="form-label">Image</label>
    <p>Currently: <a :href="profileImage.image_url"> {{profileImage.image_url}}</a></p>
    <p>Change: <input :value="profileImage.image_url" type="file" @change="selectfile"></p>
  </div>
  <button type="submit" class="btn btn-outline-info mb-3" v-if="!errors.length">Update</button>
    </form>
    
    <div class="mt-3">
      <div v-for="error in errors" :key="error">
        <h1 class="error-msg">{{error}}</h1>
      </div>
    </div>
</div>


</template>

<script>

import axios from 'axios';
export default {
name:'Profile',
data(){
    return{
        profile:[],
        profileImage:{},
        username:'',
        email:'',
        age:'',
        nickname:'',
        uploadimage:'',
        errors:[],
        isAuthenticated:'',
        imageTypes:['image/jpeg','image/png']
    }
},
async created(){
    document.title = 'Profile'

    this.isAutenticated = this.$store.state.isAuthenticated
    console.log(this.$store.state.isAuthenticated)
    const token = sessionStorage.getItem('access')
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    if (token){
      try {
    const response = await axios.get("http://localhost:8000/user/profile/",config)
    console.log(response)
    const response_data = response.data
    this.profileImage = response_data.profile
    this.profile = response_data
    this.username = response_data.username
    this.email = response_data.email
    this.age =response_data.age
    this.nickname = response_data.nickname
        
      } catch (error) {
        if(error.request.statusText == "Unauthorized"){
          sessionStorage.removeItem('access')
          sessionStorage.removeItem('refresh')
          this.$store.commit('logoutUser')
          this.$router.go('/login')
          this.$router.go(0)
          
        }
      }
    }
    else{
        this.errors.push("log in to see profile")
        

    }
},
methods:{
  async updateUser(e){
    e.preventDefault()
    try {
      const token = sessionStorage.getItem('access')
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const formdata = new FormData()
    formdata.append("username",this.username)
    formdata.append("email",this.email)
    formdata.append("age",this.age)
    formdata.append("nickname",this.nickname)
    formdata.append("image",this.uploadimage)
      
    if (token){
    const response = await axios.put("http://localhost:8000/user/profile/",formdata,config)
    this.$router.go(0)

  }
      
    } catch (error) {
      console.log(error)
    }
    
},
selectfile(e){
  const formdata = new FormData()
  if(this.imageTypes.includes(e.target.files[0].type)){
    this.uploadimage = e.target.files[0]
    console.log(this,this.uploadimage)
  }else{
    this.errors.push("File Type not supported")
  }

}

}
}
</script>

<style>

</style>