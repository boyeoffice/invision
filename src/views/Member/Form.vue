<template>
	<section class="content">
	<div class="row">
		<div class="col-md-6">
			<div class="box box-default">
				<div class="box-header with-border">
					Edit Member
				</div>
				<div class="box-body">
					<form>
						<div class="form-group">
							<label for="first_name">First Name</label>
							<input type="" name="" class="form-control" v-model="form.first_name">
						</div>
						<div class="form-group">
							<label for="last_name">Last Name</label>
							<input type="text" class="form-control" v-model="form.last_name">
						</div>
						<div class="form-group">
							<label for="email">Email</label>
							<input type="text" class="form-control" v-model="form.email">
						</div>
					</form>
				</div>
				<div class="box-footer">
				 <div class="space-btn">
					<div class="space-item">
						<button class="btn btn-block btn-default"> Cancel</button>
					</div>
					<div class="space-item">
						<button class="btn btn-danger btn-block">Deactivate</button>
					</div>
					<div class="space-item">
						<button class="btn-block btn-primary btn">Save</button>
					</div>
				</div>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="box box-default">
				<div class="box-body">
					<table class="table table-bordered">
						<thead>
							<tr><th>Student</th></tr>
						</thead>
						<tbody>
							<tr>
								<td>Hermione Grander</td>
							</tr>
							<tr>
								<td>Harry Potter</td>
							</tr>
							<tr>
								<td>Fluer Delacur</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="box box-default">
				<div class="box-body">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Order</th>
								<th>Student</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>2017 - Spring</td>
								<td>Ginny Weasley</td>
							</tr>
							<tr>
								<td>2017 - Spring</td>
								<td>Ron Weasley</td>
							</tr>
							<tr>
								<td>2017 - Spring</td>
								<td>Harry Potter</td>
							</tr>
						</tbody>
					</table>
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
				form: {}
			}
		},
		beforeMount(){
			this.fetchData()
		},
		methods: {
			fetchData(){
				axios.get('/staff/members/' + this.$route.params.id + '/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'form', res.data)
					console.log(res.data)
				})
			}
		}
	}
</script>
