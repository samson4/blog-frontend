<template>
  <div class="content-section">
    <form  id="createPostForm">
       <fieldset class="form-group">
        <legend class="border-bottom mb-4">Delete Post</legend>
        <h2>Are You sure you want to delete the post?</h2>
       </fieldset> 
  <button @click = 'ConfirmDelete' type="submit" class="btn btn-outline-danger mb-3 py-2" :disabled="errors.length" >Yes,Delete</button>
  <b class="px-1"> </b>
  <button @click="cancelReq" class="btn btn-outline-secondary mb-3 "   href="">Cancel</button>   

  </form>
  
    <div v-if="errors.length" class="mt-3">
      <div v-for="error in errors" :key="error">
        <p class="error-msg">{{error}}</p>
      </div>
    </div>
    
</div> 
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            errors:[],
            id:this.$route.params.id
        }
    },
    created(){
        window.document.title='confirm Delete?'
        console.log(this.$store.state.isAuthenticated)
        console.log(this.$store.state.token)
    },
    methods:{
        cancelReq(){
            this.$router.push(`/post/${this.id}`)
        },
        async ConfirmDelete(e){
            e.preventDefault()
            try {
               const token = sessionStorage.getItem('access')
                if(token !== ''){
                    const config = {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            const response = await axios.delete(`http://localhost:8000/post/${this.id}/delete/`,config)
                this.$router.push('/')
                }
                
            }catch (error){
                console.log(error)
            }
        }
    }

}
</script>

<style>

</style>