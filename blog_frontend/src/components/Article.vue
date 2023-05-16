<template>

  <div>
  <div v-for="post in blogPosts" :key="post.id">
  <article class="media content-section">
    <img class="rounded-circle article-img" :src="post.author.profile.make_thumbnail" alt="">
  <div class="media-body">
    <div class="article-metadata">
      <a class="mr-2">{{post.author.username}} </a>
      <small class="text-muted">{{moment(post.date_posted).format(' MMM D Y')}}</small>
    </div>
    <h2><router-link :to="{name:'Post-Detail' , params:{id:post.id}}" class="article-title"> {{post.title}} </router-link></h2>
    <p class="article-content">{{post.content}} </p>
  </div>
</article>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'


export default {
  data(){
    return{
      blogPosts:[],
      moment,
    }
  },
  async created(){
    const response = await axios.get("http://localhost:8000/")
    const response_data = response.data
    this.blogPosts = response_data
  }
}
</script>
<style>

</style>