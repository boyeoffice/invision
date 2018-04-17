<template>
	<nav class="navbar navbar-default">
    <div class="container">
    <!-- mobile-navigation -->
    <div class="res-mobile">
    	<ul class="navigation-link nav">
        <li>
          <router-link to="/" title="Dashboard"><span class="fa fa-dashboard"></span> </router-link>
        </li>
    		<li v-for="(route, index) in routes" class="dropdown">
    			<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" :title="route.title">
    				<span :class="route.icon"></span>
    			</a>
          <ul class="dropdown-menu">
           <li v-for="(url, index) in route.router"><a href="#">{{url.title}}</a></li>
          </ul>
    		</li>
        <li>
          <a href="javascript:void" title="My Profile"><span class="fa fa-user"></span> </a>
        </li>
    	</ul>
    </div>
    <!-- Desktop navigation -->
    <router-link class="navbar-brand res-desktop" to="/">Dashboard</router-link>
       <div class="collapse navbar-collapse">
       	<ul class="nav navbar-nav">
       		<li class="dropdown" v-for="(route, index) in routes">
       			<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ route.title }} <span class="caret"></span></a>
       			<ul class="dropdown-menu">
	            <li v-for="(url, index) in route.router">
                <router-link v-bind:to="url.link">{{url.title}}</router-link>
              </li>
	           </ul>
       		</li>
       	</ul>
       	 <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <span class="fa fa-user"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">My Profile</a></li>
            <li><a href="#">Alerts</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="javascript:void(0)" v-on:click="Logout">Logout</a></li>
          </ul>
        </li>
      </ul>
       </div>
    </div>
  </nav>
</template>

<script>
import Auth from '../views/Auth/auth'
import axios from 'axios'

	export default {
		data(){
			return{
				routes: [
				{
                title: 'Lunch Program', icon: 'fa fa-sitemap',
                router: [
                {title: 'Sessions', link: '/sessions', icon: 'fa fa-circle-o'},
                {title: 'Menu', link: '/staff/lunch/items', icon: 'fa fa-circle-o'},
                {title: 'Vendors', link: '/staff/lunch/vendors/', icon: 'fa fa-circle-o'},
                {title: 'No Lunch Days', link: '/staff/lunch/no-lunch-days', icon: 'fa fa-circle-o'},
                {title: 'Order', link: '/order', icon: 'fa fa-circle-o'}
                ]
                },
                {
                title: 'Shool Data', icon: 'fa fa-users',
                router: [
                {title: 'Students', link: '/all-students', icon: 'fa fa-circle-o'},
                {title: 'Teachers', link: '/all-teachers', icon: 'fa fa-circle-o'},
                {title: 'School & Grade', link: '/school-and-grade', icon: 'fa fa-circle-o'}
                ]
                },
                 {
                title: 'Administrator', icon: 'fa  fa-cog',
                router: [
                {title: 'Staff', link: '/staff', icon: 'fa fa-circle-o'},
                {title: 'Member', link: '/member', icon: 'fa fa-circle-o'},
                {title: 'Configuration', link: '/settings', icon: 'fa fa-circle-o'}
                ]
                }
				]
			}
	   },
	   methods: {
	   	Logout(){
	   		axios.delete('/staff/auth/' ).then(res => {
	   			this.$store.commit('logout_data')
	   			Auth.remove()
          this.$router.push({name: 'Login'})
	   			console.log(res.data)
	   		}).catch(err => {

        })
	   	}
	   }
	}
</script>