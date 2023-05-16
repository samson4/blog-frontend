<template>
    <div>
  <div >
  <article class="media content-section">
    <img class="rounded-circle article-img" :src="Post.author.profile.image_url" alt="">
  <div class="media-body">
    <div class="article-metadata">
      <a class="mr-2">{{Post.author.username}} </a>
      <small class="text-muted"> {{moment(Post.date_posted).format(' MMM D Y ')}}</small>
      <div>
    <a class="btn btn-secondary btn-sm mt-1 mb-1" :href="`/post/${id}/update/`">Update</a>
    <b class="px-1"></b>
    <a class="btn btn-danger btn-sm mt-1 mb-1" :href="`/post/${id}/delete/`">Delete</a>
    </div>
    </div>
    <h2 class="article-title"> {{Post.title}}</h2>
    
    <p class="article-content">{{Post.content}} </p>
  </div>
</article>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import moment from 'moment';
export default {
data(){
    return{
        id:this.$route.params.id,
        moment,
        Post:[]
    }
},
methods:{
    ...mapActions(['fetchPost'])
},
 async created(){
    
    const response = await  this.fetchPost(this.id)
    console.log(response)
    this.Post = response

    
}

}
</script>

<style>

</style>