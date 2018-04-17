<template>
	<section class="content">
	<div class="row">
		<div class="col-md-12">
		<div class="box box-default">
			<div class="box-header with-border">
				{{title}}
			</div>
			<div class="box-body">
				<div class="form-group">
					<div class="row">
					<div class="col-md-8">
					<label>Name</label>
					<input type="text" v-model="form.name" class="form-control custom-search">
				   </div>
				   <div class="col-md-4">
				   	<label>Featured Order</label>
				   	<multiselect
					      v-model="selected"
					      :options="options"
					      placeholder="Select grade">
					    </multiselect>
				   </div>
					</div>
				</div>
				<div class="form-group">
					<label>Product Image</label>
					<img style="cursor: pointer" onclick="document.getElementById('fileimg').click()" :src="formData.image" width="160" class="img img-responsive" />
					<br/>
					<input style="display: none;" :name="uploadFileName" id="fileimg" type="file" accept="image/*" class="input-file" v-on:change="onFileChange">
					<a href="javascript:void(0)" onclick="document.getElementById('fileimg').click()" class="btn btn-success btn-sm">Choose Image</a>
					<a href="javascript:void(0)" v-if="isLoading" disabled="" class="btn btn-primary btn-sm"><i class="fa fa-spinner fa-spin"></i></a>
					<a href="javascript:void(0)" v-else @click="uploadImage" class="btn btn-primary btn-sm">Update</a>
				</div>
					<div class="form-group">
					<label>School</label>
				</div>
				<div class="form-group">
					<div class="form-check form-check-inline" v-for="(list, index) in schoolList">
										 <input class="form-check-input" type="checkbox" v-model="form.schools" :value="list.id" :id="list.id">
										 <label class="form-check-label">{{list.display_name}}</label>
					</div>
					</div>
				<div class="form-group">
					<div class="row">
					<div class="col-sm-4">
						<label>Session</label>
						<multiselect
					      v-model="selectedSes"
					      :options="modelSession"
								label="name"
								track-by="id"
					      placeholder="Select session">
					    </multiselect>
					</div>
					<div class="col-sm-4">
						<label>Unit Price $</label>
						<input type="text" class="form-control custom-search" name="" v-model="form.unit_price">
					</div>
					<div class="col-sm-4">
						<label>Vendor</label>
						<multiselect
					      v-model="selectedVed"
					      :options="modelVendor"
								label="name"
					      placeholder="Select vendor">
					    </multiselect>
					</div>
				</div>
			  </div>
				<!-- /.form-group -->
				<div class="form-group">
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="checkbox" v-model="form.is_taxable">
							<label class="form-check-label">Is Taxable</label>
						</div>
				</div>
				<div class="form-group">
					<label>Days</label>
				</div>
				<div class="form-group">
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="checkbox" v-model="form.monday">
							<label class="form-check-label">Monday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" v-model="form.tuesday">
							<label class="form-check-label">	Tuesday	</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" v-model="form.wednessday">
							<label class="form-check-label">Wednessday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" v-model="form.thursday">
							<label class="form-check-label">Thursday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" v-model="form.friday">
							<label class="form-check-label">Friday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" v-model="form.saturday">
							<label class="form-check-label">Saturday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" v-model="form.sunday">
							<label class="form-check-label">Sunday</label>
						</div>
					<!-- /.form-inline -->
				</div>
				<div class="form-group">
						<label>Description</label>
						<vue-editor v-model="form.description"></vue-editor>
				</div>
				<div class="form-group">
					<label>Comment</label>
					<textarea class="form-control" rows="2"></textarea>
				</div>
				<div class="form-group">
					<multiselect
					      v-model="tagsArray"
					      :options="modelTags"
					      :multiple="true"
								label="display_name"
					      placeholder="Select Tags">
					</multiselect>
				</div>
			</div>
			<div class="box-footer">
				<div class="row">
					<div class="col-md-6 col-md-offset-6">
				  	<div class="space-btn">
					<div class="space-item">
						<router-link to="/staff/lunch/items" class="btn btn-default">Cancel</router-link>
					</div>
					<div class="space-item">
						<button class="btn btn-danger">Deactivate</button>
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
	</div>
</section>
</template>

<script>
	import Vue from 'vue'
	import Multiselect from 'vue-multiselect'
	import { VueEditor } from 'vue2-editor'
	import Auth from '../../auth'
	export default{
		components: {Multiselect, VueEditor},
		data(){
			return{
				form: {schools: []},
				uploadFileName: 'photo',
				content: '',
				selected: '1',
				options: ['1', '2', '3', '4', '5', '6'],
				unit: 0,
				modelTags: [],
				tagsArray: [],
				formData: {image: '/default.png'},
				selectedSes: '',
				modelSession: [],
				selectedVed: {},
				modelVendor: [],
				schoolList: [],
				title: 'Add Lunch Item',
				method: 'post',
				initialize: '/staff/lunch/items/',
				store: '/staff/lunch/items/',
				message: 'Lunch was created successfully',
				isLoading: false,
			}
		},
		beforeMount(){
			document.title = 'Menu'
			if(this.$route.meta.mode === 'edit'){
				this.initialize = '/staff/lunch/items/' + this.$route.params.id + '/'
				this.store = '/staff/lunch/items/' + this.$route.params.id + '/'
				this.method = 'patch'
				this.fetchData()
			}
			this.fetchSchools()
		},
		methods: {
			uploadImage(){
				this.isLoading = true
				axios.post('/staff/assets/', this.formData, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					console.log(res.data)
					this.form.image = res.data.id
					this.isLoading = false
					toastr.success('Image was uploaded successfully')
				})
			},
			fetchSchools(){
				axios.get('/staff/schools/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'schoolList', res.data)
					this.fetchTag()
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
              vm.formData.image = e.target.result;
            };
            reader.readAsDataURL(file);
          },
					fetchData(){
						axios.get(this.initialize, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
							this.form = res.data
							console.log(res.data)
							this.selectedSes = res.data.lunch_session
							this.selectedVed = res.data.vendor
							this.tagsArray = res.data.tags
							var schools = []
							res.data.schools.forEach(function(school){
								schools.push(school.id)
							})
						 this.form.schools = schools
						 this.formData.image = res.data.image
						})
					},
          saveData(){
						var tags = []
						this.tagsArray.forEach(function(tag){
							tags.push(tag.id)
						})
						 this.form.tags = tags
						 this.form.lunch_session = this.selectedSes.id
						 this.form.vendor = this.selectedVed.id

          	axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
          		toastr.success(this.message)
							this.$router.push('/staff/lunch/items/')
          	})
          },
				fetchTag(){
						axios.get('/staff/tags/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
							this.modelTags = res.data
							this.fetchSession()
						})
				 },
				 fetchSession(){
					 axios('/staff/lunch/sessions/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
						 this.modelSession = res.data
						 this.fetchVend()
					 })
				 },
				 fetchVend(){
					 axios('/staff/lunch/vendors/',  {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
						 this.modelVendor = res.data
					 })
				 }
		},
		computed: {

		}
	}
</script>
