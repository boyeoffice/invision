<template>
	<section class="content">
	<div class="row">
		<div class="col-md-6">
			<div class="box box-success">
				<div class="box-header with-border"><h2 class="box-title">Profile</h2></div>
				<div class="box-body">
					<form>
						<div class="form-group">
							<label>Name</label>
							<input type="text" class="form-control" v-model="fullname">
						</div>
						<div class="form-group">
							<label>Email</label>
							<input type="text" class="form-control" v-model="form.email">
						</div>
					</form>
				</div>
				<div class="box-footer">
					<div class="space-btn">
						<div class="space-item">
							<router-link to="/" class="btn btn-default">Cancel</router-link>
						</div>
						<div class="space-item">
							<button class="btn btn-primary" @click="saveProfile">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="box box-danger">
				<div class="box-header with-border"><h2 class="box-title">Updated Password</h2></div>
				<div class="box-body">
					<div class="form-group">
						<label>Current Password</label>
						<input type="text" class="form-control" v-model="password.old_password">
					</div>
					<div class="form-group">
						<label>New Password</label>
						<input type="text" class="form-control" v-model="password.new_password">
					</div>
					<div class="form-group">
						<label>Confirm New Password</label>
						<input type="text" class="form-control" v-model="password.confirm_password">
					</div>
				</div>
				<div class="box-footer">
					<div class="space-btn">
						<div class="space-item">
							<router-link to="/" class="btn btn-default">Cancel</router-link>
						</div>
						<div class="space-item">
							<button class="btn btn-primary" @click="savePassword">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
</template>

<script>
import Vue from 'vue'
import Auth from '../../auth'
	export default{
		data(){
			return {
				form: {},
				password: {}
			}
		},
		computed: {
			fullname: {
							// getter
						get: function () {
							return this.form.first_name + ' ' + this.form.last_name
						},
						// setter
			    set: function (newValue) {
			      var names = newValue.split(' ')
			      this.form.first_name = names[0]
			      this.form.last_name = names[names.length - 1]
			    }
				//return this.form.first_name + ' ' + this.form.last_name
			}
		},
		created(){
			this.$store.commit('title_bar_data', 'Profile')
			this.fetchData()
		},
		methods: {
			fetchData(){
				axios.get('/staff/my-profile/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'form', res.data)
					console.log(res.data)
				})
			},
			saveProfile(){
				axios.post('/staff/my-profile/', this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('Your profile has been updated successfully')
				})
			},
			savePassword(){
				axios.put('/staff/my-profile/', this.password, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('Your password has been changed successfully')
				})
			}
		}
	}
</script>
