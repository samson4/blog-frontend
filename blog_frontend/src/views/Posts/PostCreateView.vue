<template>
  <div class="content-section">
    <form @submit.prevent = 'CreatePost' id="createPostForm">
       <fieldset class="form-group">
        <legend class="border-bottom mb-4">Blog Post</legend>
       </fieldset> 
    <div class="mb-3">
        <label  class="form-label">Title*</label>
        <input  type="text" class="form-control" v-model="title" required>
    </div>

    <div class="mb-3">
        <label  class="form-label">content*</label>
        <textarea  name="" rows="10" class="form-control" form="createPostForm" v-model="content" required></textarea>
        <!-- <input type="email" class="form-control content" id="exampleInputEmail1"  aria-describedby="emailHelp"> -->
    </div>
  <button type="submit" class="btn btn-outline-info mb-3" :disabled="errors.length" >Post</button>
    </form>
    <div v-if="errors.length" class="mt-3">
      <div v-for="error in errors" :key="error">
        <p class="error-msg">{{error}}</p>
      </div>
    </div>
    
</div> 
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            title:'',
            content:'',
            errors:[]
        }
    },
    methods:{
        async CreatePost(){
            try {
                const token = sessionStorage.getItem('access')
                
                if (token !== ''){
                    const formdata = new FormData()
                    formdata.append("title",this.title)
                    formdata.append("content",this.content)
                    const config = {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                    const response = await axios.post('http://localhost:8000/post/new/',formdata,config)
                    console.log(response.data)

                }else{
                    this.errors.push("Token is invalid or expired")
                }

            } catch (error) {
                
                console.log(error)
            }
        }
    },
    created(){
        window.document.title='New Post'
        const token = sessionStorage.getItem('access')
                if(token){
                    console.log(token)
                }else{
                    this.errors.push("Token is invalid or expired")
                }
    }

}
</script>

<style>

.form-control.content{
    
    height: 500px !important;
}
</style>