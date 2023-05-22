<template>
   <div>
    <h1 class="mb-3">Posts by {{ user }} ({{ UserPosts.length }})</h1>
  <div v-for="post in UserPosts" :key="post.id">
  <article class="media content-section">
    <img class="rounded-circle article-img" :src="post.author.profile.make_thumbnail" alt="">
  <div class="media-body">
    <div class="article-metadata">
      <a :href="post.author.username" class="mr-2">{{post.author.username}} </a>
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
import Pagination from '../../components/Pagination.vue'

export default {
    components:{
        Pagination,
        
    },
    data(){
        return{
            UserPosts:[],
            moment,
            user:this.$route.params.username
        }
    },
    methods:{
        async fetchUserPosts(user){
            const response = await axios.get(`http://localhost:8000/post/user/${user}`)
            this.UserPosts =  response.data
            console.log(this.UserPosts.length)
        }
    },
    created(){
        this.fetchUserPosts(this.user)
        
        
    }

}
</script>

<style scoped>
h1.mb-3{
    padding-left: 240px;
}
</style>