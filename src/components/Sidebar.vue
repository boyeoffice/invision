<template>
	<aside id="slider" class="main-sidebar">
		<section class="sidebar">

       <ul data-widget="tree" class="sidebar-menu">
       	<li class="header">MAIN NAVIGATION</li>
				<router-link to="/" tag="li">
					<a><i class="fa fa-dashboard"></i>  <span>Dashboard</span> </a>
				</router-link>
       	<li class="treeview" v-for="(route , index ) in routes">
          <a href="javascript:void(0);">
            <i :class="route.icon"></i> <span>{{route.title}}</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
						<router-link :to="url.link" tag="li" v-for="(url, index) in route.router" :key="route.id">
							<a>
								<i :class="url.icon"></i>
								{{url.title}}
							</a>
						</router-link>
          </ul>
        </li>
        <li class="tree-view">
          <a href="javascript:void(0)" @click="Signout"><i class="fa fa-sign-out"></i> <span>Logout</span></a>
        </li>
       </ul>
		</section>
	</aside>
</template>

<script>
import Auth from './../auth'
	export default{
		data(){
			return{
        selected: parseInt(localStorage.getItem('index_number')),
				routes: [
              {
                title: 'Shool Data', icon: 'fa fa-users',
                router: [
                {title: 'Students', link: '/staff/students', icon: 'fa fa-circle-o'},
                {title: 'Teachers', link: '/staff/teachers', icon: 'fa fa-circle-o'},
                {title: 'Mics metadata', link: '/staff/misc-metadata', icon: 'fa fa-circle-o'}
                ]
              },
              {
                title: 'Lunch Program', icon: 'fa fa-sitemap',
                router: [
                {title: 'Sessions', link: '/staff/lunch/sessions', icon: 'fa fa-circle-o'},
                {title: 'Menu', link: '/staff/lunch/items', icon: 'fa fa-circle-o'},
                {title: 'Vendor', link: '/staff/lunch/vendors', icon: 'fa fa-circle-o'},
                {title: 'No Lunch Days', link: '/staff/lunch/no-lunch-days', icon: 'fa fa-circle-o'},
                {title: 'Order', link: '/staff/lunch/orders', icon: 'fa fa-circle-o'}
                ]
              },
              {
                title: 'Administrator', icon: 'fa  fa-cog',
                router: [
                {title: 'Staffs', link: '/staff/staffs/', icon: 'fa fa-circle-o'},
                {title: 'Members', link: '/staff/members', icon: 'fa fa-circle-o'},
                {title: 'Configuration', link: '/settings', icon: 'fa fa-circle-o'}
                ]
              },
              {
                title: 'My Profile', icon: 'fa fa-user',
                router: [
                {title: 'Profile', link: '/user/profile', icon: 'fa fa-circle-o'},
                {title: 'Alerts', link: '/alerts/notifications', icon: 'fa fa-circle-o'}
                ]
              }
        ],
        showItem: false
			}
		},
    methods: {
      getActive(index){
        this.selected = index
        localStorage.setItem('index_number', index)
      },
       Signout(){
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
