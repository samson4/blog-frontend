<template>

  <div>
  <div v-for="post in blogPosts" :key="post.id">
  <article class="media content-section">
    <img class="rounded-circle article-img" :src="post.author.profile.make_thumbnail" alt="">
  <div class="media-body">
    <div class="article-metadata">
      <router-link :to="{name:'UserPostsView', params:{username:post.author.username} }" class="mr-2">{{post.author.username}} </router-link>
      <small class="text-muted">{{moment(post.date_posted).format(' MMMM D,Y')}}</small>
    </div>
    <h2><router-link :to="{name:'Post-Detail' , params:{id:post.id}}" class="article-title"> {{post.title}} </router-link></h2>
    <p class="article-content">{{post.content}} </p>
  </div>
</article>

    </div>
    <Pagination @next='fetchNext($event)'/>
  </div>
  
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Pagination from './Pagination.vue'

export default {
  components:{
    Pagination
  },
  data(){
    return{
      blogPosts:[],
      moment,
    }
  },
  async created(){

    const response = await axios.get("http://localhost:8000/")
    const response_data = response.data
    this.blogPosts = response_data.results
  },
  methods:{
    async fetchNext(pnum){
      console.log(pnum)
      const response = await axios.get(`http://localhost:8000/?page=${pnum}`)
      this.blogPosts = response.data.results
      console.log(response.data)
    }
  }
}
</script>
<style>

</style>