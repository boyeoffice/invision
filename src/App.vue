<template>
  <div id="app">
    <div class="wrapper">
    <navbar v-if="isLoggedIn"></navbar>
    <sidebar v-if="isLoggedIn"></sidebar>
    <div class="content-wrapper">
      <section v-if="isLoggedIn" class="content-header"><h1>{{titleTop}}</h1> </section>
  	 <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
      <main-footer v-if="isLoggedIn"></main-footer>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import MainFooter from '@/components/MainFooter'
import Auth from './auth.js'
export default {
  name: 'app',
  components:{Navbar, Sidebar, MainFooter},
  data(){
  	return{
  		isAuth: false
  	}
  },
  created(){
  		if(Auth.isAuthenticated()){
  			this.isAuth = true
  		}
  },
  methods: {
  	
  },
  computed: {
    isLoggedIn(){
      return this.$store.state.isLoggedIn
    },
    titleTop(){
      return this.$store.state.titleTop
    }
  }
}
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>

