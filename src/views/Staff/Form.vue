<template>
	<section class="content">
	<div class="row">
		<div class="col-md-6">
			<div class="box box-default">
				<div class="box-header with-border">
					Edit Staff
				</div>
				<div class="box-body">
					<form>
						<div class="form-group">
							<label for="first_name">First Name</label>
							<input type="text" v-model="form.first_name" class="form-control">
						</div>
						<div class="form-group">
							<label for="last_name">Last Name</label>
							<input type="text" class="form-control" v-model="form.last_name">
						</div>
						<div class="form-group">
							<label for="email">Email</label>
							<input type="text" class="form-control" v-model="form.email">
						</div>
						<div class="form-group">
							<label for="role">Roles</label>
						</div>
						<div class="form-roup">
							   <div class="form-check form-check-inline">
								  <input class="form-check-input" type="checkbox" value="monday" v-model="form.is_superuser">
									<label class="form-check-label">Administrator</label>
								</div>
								<div class="form-check form-check-inline">
								 <input class="form-check-input" type="checkbox" value="monday" v-model="form.is_staff">
								 <label class="form-check-label">Staff</label>
							 </div>
						</div>
					</form>
				</div>
				<div class="box-footer">
					<div class="space-btn">
					<div class="space-item">
						<router-link to="/staff/staffs" class="btn btn-block btn-default"> Cancel</router-link>
				</div>
					<div class="space-item">
						<button class="btn btn-danger btn-block" v-if="form.is_active === true" @click="deactivate">Deactivate</button>
						<button class="btn btn-success btn-block" v-else @click="activate">Activate</button>
				</div>
					<div class="space-item">
						<button class="btn-block btn-primary btn" @click="save">Save</button>
				</div>
			</div>
				</div>
			</div>
		</div>
	</div>
</section>
</template>

<script>
import Auth from '../../auth'
	export default {
		data(){
			return{
				form: {},
				method: 'patch',
				store: '/staff/staffs/' + this.$route.params.id + '/',
				initialize: '/staff/staffs/' + this.$route.params.id + '/'
			}
		},
		beforeMount(){
			this.fetchData()
		},
		methods: {
			fetchData(){
				axios.get(this.initialize, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					this.form = res.data
				})
			},
			save(){
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					console.log(res.data)
					toastr.success('You have edited ' + this.form.first_name + ' successfully')
					this.$router.push('/staff/staffs')
				})
			},
			activate(){
				this.form.is_active = true
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('You have activated ' + this.form.first_name + ' successfully')
				})
			},
			deactivate(){
				this.form.is_active = false
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('You have deactivated ' + this.form.first_name + ' successfully')
				})
			}
		}
	}
</script>
