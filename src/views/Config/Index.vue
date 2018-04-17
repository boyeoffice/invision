<template>
	<section class="content">
	<div class="row">
		<div class="col-md-6">
			<div class="box box-default">
				<div class="box-header with-border">
					<h2 class="box-title">Site Configuration</h2>
				</div>
				<div class="box-body">
					<form>
						<div class="form-group">
							<label>Site Name</label>
							<input type="text" class="form-control" v-model="form.site_name">
						</div>
						<div class="form-group">
							<label>Email</label>
							<input type="text" class="form-control" v-model="form.site_email">
						</div>
						<div class="form-group">
							<label>Member</label>
							<input type="text" class="form-control" v-model="form.member">
						</div>
						<div class="form-group">
							<label>Other Configuration</label>
							<input type="text" class="form-control">
						</div>
						<div class="form-group">
							<label>Other Configuration</label>
							<input type="text" class="form-control">
						</div>
						<div class="form-group">
							<label>Other Configuration</label>
							<input type="text" class="form-control">
						</div>
					</form>
				</div>
				<div class="box-footer">
					<div class="space-btn">
						<div class="space-item">
							<button class="btn btn-default">Cancel</button>
						</div>
						<div class="space-item">
							<button class="btn btn-primary">Save</button>
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
			return{
				form: {
					site_name: 'Magic World of Harry Potter',
					site_email: 'prefilled-with-known-email@gmail.com',
					member: 'IH74HIEUHFLJ303',
				},
				model: []
			}
		},
		created(){
			document.title = 'Site Configuration'
			this.$store.commit('title_bar_data', 'Site Configuration')
			this.fetchData()
		},
		methods: {
			fetchData(){
				axios.get('/staff/site-config/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'model', res.data)
					console.log(res.data)
				})
			}
		}
	}
</script>
