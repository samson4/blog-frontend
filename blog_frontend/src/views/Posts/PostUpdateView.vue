<template>
   <div class="content-section">
    <form @submit.prevent = 'UpdatePost()' id="createPostForm">
       <fieldset class="form-group">
        <legend class="border-bottom mb-4">Blog Post</legend>
       </fieldset> 
    <div class="mb-3">
        <label  class="form-label">Title*</label>
        <input  type="text" class="form-control" v-model="title" required>
    </div>

    <div class="mb-3">
        <label  class="form-label">content*</label>
        <textarea  name="" rows="10" class="form-control" form="createPostForm"  v-model="content" required></textarea>
        
    </div>
  <button type="submit" class="btn btn-outline-info mb-3">Post</button>
    </form>
</div> 
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import axios from 'axios';
export default {
    data(){
        return{
            Post:[],
            id:this.$route.params.id,
            content:'',
            title:''
        }
    },
    methods:{
    ...mapActions(['fetchPost']),
    async UpdatePost(){
      try {
                const token = sessionStorage.getItem('access')
                if(token !== ''){
                    const config = {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
                const formdata = new FormData()
                formdata.append('title',this.title)
                formdata.append('content',this.content)
                const response = await axios.put(`http://localhost:8000/post/${this.id}/update/`,formdata,config)
                console.log(response.data)
                this.$router.go(0)
                }
                
            }catch (error){
                console.log(error.response.data)
            }
    }
},
 async created(){
    
    const response = await  this.fetchPost(this.id)
    console.log(response)
    this.Post = response
    this.title=response.title
    this.content = response.content
}

}
</script>

<style>

</style>