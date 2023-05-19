<template>
  <div class="content-section">
    <form @submit.prevent = 'ConfirmDelete()' id="createPostForm">
       <fieldset class="form-group">
        <legend class="border-bottom mb-4">Delete Post</legend>
        <h2>Are You sure you want to delete the post?</h2>
       </fieldset> 
  <button type="submit" class="btn btn-outline-danger mb-3 py-2" :disabled="errors.length" >Yes,Delete</button>
  <b class="px-1"> </b>
  <button @click="cancelReq()" class="btn btn-outline-secondary mb-3 "   href="">Cancel</button>
       
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
        console.log(this.$store.state.Token)
    },
    methods:{
        cancelReq(){
            this.$router.go(-1)
        },
        async ConfirmDelete(){
            try {
                token = sessionStorage.getItem('access')
                if(token !== ''){
                    const config = {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            const response = await axios.delete(`http://localhost:8000/post/${this.id}/delete/`,config)
            
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