import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    isAuthenticated :false,
    isLoading:false,
    token:null,
    todos:[],

  },
  getters: {
  },
  mutations: {
    // mutations are commited
    initializeStore(state){
      const Token = sessionStorage.getItem("access")
      if(Token){
        state.token = Token
        state.isAuthenticated=true
      }
      else{
        state.token=null
        state.isAuthenticated=false
      }
    },
    
    loginUser(state,status){
      state.isAuthenticated=true
      state.token = Token
    },
    logoutUser(state){
      state.isAuthenticated = false
      sessionStorage.removeItem('access')
      sessionStorage.removeItem('refresh')
      state.token=null
    }
  },
  actions: {
    // actions are dispatched.
    async fetchPost({commit},pk){
      const response = await axios.get(`http://localhost:8000/post/${pk}`)
      return response.data
    }

  },
  modules: {
  }
})
