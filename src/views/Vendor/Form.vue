<template>
	<section class="content">
	<div class="row">
		<div class="col-md-12">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">{{ title }}</h3>
				</div>
				<div class="box-body">
					<form>
						<div class="form-group">
							<label>Name</label>
							<input type="text" class="form-control" v-model="form.name" name="">
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<label>Logo or Vendor Image</label>
							<img style="cursor: pointer;" onclick="document.getElementById('fileimg').click()" :src="fileImage.image" width="200" class="img-responsive">
							 <br/>
							<a class="btn btn-success btn-sm" href="javascript:void(0)" @click="uploadImage">
								Upload
						    </a>

						    <input type="file" style="display: none" id="fileimg" v-on:change="onFileChange">
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<label>Contact Name</label>
							<input type="text" class="form-control" v-model="form.contact_name">
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<label>Address</label>
							<input type="text" class="form-control" v-model="form.street_1">
						</div>
								<!-- /.form-group -->
						<div class="form-group">
							<div class="row">
								<div class="col-md-4">
									<label>City</label>
									<input type="text" class="form-control" v-model="form.city">
								</div>
								<div class="col-md-4">
									<label>State</label>
									<input type="text" class="form-control" v-model="form.state">
								</div>
								<div class="col-md-4">
									<label>Zip</label>
									<input type="text" class="form-control" v-model="form.zip">
								</div>
							</div>
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<div class="row">
								<div class="col-md-4">
									<label>Email</label>
									<input type="text" class="form-control" v-model="form.email">
								</div>
								<div class="col-md-4">
									<label>Phone</label>
									<input type="text" class="form-control" v-model="form.contact_phone">
								</div>
								<div class="col-md-4">
									<label>Fax</label>
									<input type="text" class="form-control" v-model="form.fax">
								</div>
							</div>
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<div class="row">
								<div class="col-md-4">
									<label>Health Inspection Certificate</label>
									<input type="file" id="selectFile" style="display: none;" name="">
								</div>
								<div class="col-md-4">
									<a href="javascript:void(0)" class="btn btn-primary btn-sm" onclick="document.getElementById('selectFile').click()">Update</a>
								</div>
							</div>
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<label>Comment</label>
							<textarea class="form-control" rows="3" v-model="form.comment"></textarea>
						</div>
						<!-- /.form-group -->


					</form>
				</div>
				<div class="box-footer">
						<div class="row">
							<div class="col-md-6 col-md-offset-6">
							<div class="space-btn">
								<div class="space-item">
									<router-link to="/staff/lunch/vendors/" class="btn btn-default">Cancel</router-link>
								</div>
								<div class="space-item">
									<button v-if="! dangerButton" class="btn btn-danger btn-block btn-sm" v-on:click="deleteData">Deactivate</button>
									<button v-else class="btn btn-danger btn-block btn-sm" v-on:click="clearForm">Clear</button>
								</div>
								<div class="space-item">
									<button class="btn btn-primary btn-block btn-sm" v-on:click="saveData">Save</button>
								</div>
							</div>
						</div>
					</div>
						</div>
					</div>
					</div>
	</div>
</section>
</template>

<script>
	import Multiselect from 'vue-multiselect'
	import Vue from 'vue'
	import Auth from '../../auth'
	export default{
		components: {Multiselect},
		data(){
			return{
				form: {},
				selected: 'Hogwarts',
				options: ['Hogwarts', 'Funholding', 'Vivaholding'],
				unit: 0,
				tags: ['tags', 'tag1', 'tag3'],
				tagsArray: ['tag1', 'tag2', 'tag3', 'tag4'],
				title: 'Create Vendor',
				store: '/staff/lunch/vendors/',
				initialize: '/staff/lunch/vendors/',
				method: 'post',
				title: 'Create Vendor',
				dangerButton: true,
				fileImage: {image: ''}
			}
		},
		beforeMount(){
			if(this.$route.meta.mode === 'edit'){
				this.title = 'Edit Vendor'
				this.initialize = '/staff/lunch/vendors/' + this.$route.params.id + '/'
				this.store = '/staff/lunch/vendors/' + this.$route.params.id + '/'
				this.method = 'patch'
				this.dangerButton = false
				this.fetchData()
			}
		},
		methods:{
			uploadImage(){
				axios.post('/staff/assets/', this.fileImage, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					this.form.logo = res.data
				})
			},
			onFileChange(e){
		            let files = e.target.files || e.dataTransfer.files;
		            if (!files.length) return;
		            this.createImage(files[0]);
		          },
		          createImage(file){
		            let reader = new FileReader();
		            let vm = this;
		            reader.onload = (e) => {
		              vm.fileImage.image = e.target.result;
		            };
		            reader.readAsDataURL(file);
		         },
		         fetchData(){
		         	var vm = this
		         	axios.get(this.initialize, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
		         		Vue.set(vm.$data, 'form', res.data)
								this.fileImage.image = res.data.logo
		         	})
		         },
		         saveData(){
		         	axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
		         		console.log(res.data)
		         		this.$router.push({name: 'Vendors'})
		         	}).catch(err => {
		         		console.log(err)
		         	})
		         },
		         deleteData() {
		         	axios.delete(this.initialize, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
		         		console.log(res.data)
		         		this.$router.push({name: 'Vendors'})
		         	}).catch(err => {

		         	})
		         },
		         clearForm(){
		         	this.form = ''
		         }
		    }
	}
</script>
