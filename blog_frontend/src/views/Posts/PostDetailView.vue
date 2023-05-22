<template>
    <div>
  <div >
  <article class="media content-section">
    <img class="rounded-circle article-img" :src="Post.author.profile.image_url" alt="">
  <div class="media-body">
    <div class="article-metadata">
      <router-link :to="{name:'UserPostsView', params:{username:Post.author.username} }" class="mr-2">{{Post.author.username}} </router-link>
      <small class="text-muted"> {{moment(Post.date_posted).format(' MMM D Y ')}}</small>
      <div>
    <a v-show="postowner == true" class="btn btn-secondary btn-sm mt-1 mb-1" :href="`/post/${id}/update/`">Update</a>
    <b class="px-1"></b>
    <a v-show="postowner == true" class="btn btn-danger btn-sm mt-1 mb-1" :href="`/post/${id}/delete/`">Delete</a>
    </div>
    </div>
    <h2  class="article-title"> {{Post.title}}</h2>
    
    <p class="article-content">{{Post.content}} </p>
  </div>
</article>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import axios from 'axios';
import moment from 'moment';
export default {
data(){
    return{
        id:this.$route.params.id,
        moment,
        Post:[],
        loggedIn:false,
        postowner:Boolean,
    }
},
methods:{
    ...mapActions(['fetchPost'])
},
 async created(){
    this.loggedIn = this.$store.state.isAutenticated
    const response = await  this.fetchPost(this.id)
    const fetchpost_id =response.author.id
    this.Post = response
    window.document.title=`${this.Post.title}`
    const token = sessionStorage.getItem('access')
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    if (token){
      
    const response = await axios.get("http://localhost:8000/user/profile/",config)
    const profile_id = response.data.id
    if(fetchpost_id == profile_id){
      this.postowner = true
    }
      }
    
    
    
}

}
</script>

<style>

</style>