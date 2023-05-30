import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView'
import PostDetailView from '../views/Posts/PostDetailView.vue'
import PostCreateView from '../views/Posts/PostCreateView.vue'
import PostConfirmDelete from '../views/Posts/PostConfirmDelete.vue'
import PostUpdateView from '../views/Posts/PostUpdateView.vue'
import UserPostsView from '../views/User/UserPostsView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }

  },
  {
    path:'/register',
    name:'Register',
    component:RegisterView
  },
  {
    path:'/login',
    name:'LogIn',
    component:LoginView,
    
  },
  {
    path:'/profile',
    name:'Profile',
    component:ProfileView,
    beforeEnter:(to,from,next)=>{
      if(store.state.isAuthenticated==false){
        next('/login')
      }else{
        next()
      }
    }
  },
  {
    path:'/post/:id',
    name:'Post-Detail',
    component:PostDetailView,
    props:true,
  
  },
  {
    path:'/post/new',
    name:'CreatePost',
    component:PostCreateView,
    beforeEnter:(to,from,next)=>{
      if(store.state.isAuthenticated==false){
        next('/login')
      }else{
        next()
      }
    }
  },
  {
    path:'/post/:id/delete',
    name:'PostConfirmDelete',
    component:PostConfirmDelete
  },
  {
    path:'/post/:id/update',
    name:'PostUpdateView',
    component:PostUpdateView
  },
  
  {
    path:'/posts/:username',
    name:'UserPostsView',
    component:UserPostsView
  },

  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
