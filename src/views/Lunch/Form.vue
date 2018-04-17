<template>
	<section class="content">
		<div class="row">
			<div class="col-md-8">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title">
							{{title}}
						</h3>
					</div>
					<div class="box-body">
						<div class="form-group">
							<label>Name</label>
							<input type="text" class="form-control" v-model="form.description">
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
					 	<label class="col-md-8">Date</label>
					 	<datepicker :bootstrapStyling="true" v-model="form.no_lunch_on" wrapperClass="col-md-6" :calendarButton="true" calendarButtonIcon="fa fa-calendar" :required="true"></datepicker>
					 </div>
					 </div>
					</div>
					  <div class="box-footer">
			          <div class="row">
			            <div class="col-md-6 col-md-offset-6">
			             <div class="space-btn">
			                <div class="space-item">
			                  <router-link to="/staff/lunch/no-lunch-days" class="btn btn-default">Cancel</router-link>
			                </div>
			                <div class="space-item">
			                  <button class="btn btn-danger" v-show="isDangerButton" v-on:click="deleteContent">Delete</button>
												<button class="btn btn-danger" v-show="! isDangerButton" v-on:click="clearForm">Clear</button>
			                </div>
			                <div class="space-item">
			                  <button class="btn btn-primary" v-on:click="save">Save</button>
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
import swal from 'sweetalert2'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import Auth from '../../auth'
import Vue from 'vue'
	export default {
		components: {
			Datepicker
		},
		data(){
			return{
				form: {schools:[]},
				schoolList: [],
				initialize: '/staff/lunch/nolunchdays/',
				title: 'Create',
				store: '/staff/lunch/nolunchdays/',
				method: 'post',
				checkedBox: [],
				isDangerButton: false,
				message: 'New No Lunch day was created successfully'
			}
		},
		beforeMount(){
			if(this.$route.meta.mode === 'edit'){
				this.title = 'Edit',
				this.initialize = '/staff/lunch/nolunchdays/' + this.$route.params.id + '/'
				this.store = '/staff/lunch/nolunchdays/' + this.$route.params.id + '/'
				this.method = 'patch'
				this.isDangerButton = true
				this.message = 'No lunch day was edited successfully'
				this.fetchData()
			}
			this.fetchSchool()
		},
		methods: {
			fetchData(){
				var vm = this
				axios.get(this.initialize, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(vm.$data, 'form', res.data)
				})
			},
			fetchSchool(){
				var vm = this
				axios.get('/staff/schools/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(vm.$data, 'schoolList', res.data)
				})
			},
			checked(list){
					this.checkedBox = list
			},
			save(){
				this.form.no_lunch_on = moment(this.form.no_lunch_on).format('YYYY-MM-DD')
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					console.log(res.data)
					this.$router.push({name: 'Lunch'})
					toastr.success(this.message)
				}).catch(err => {
					console.log(err)
				})
			},
			deleteContent(){
				 swal({
				 	title: 'Are you sure?',
				 	text: 'You will not be able to recover this content!',
				 	type: 'warning',
				 	showCancelButton: true,
				 	confirmButtonColor: '#DD6B55',
				 	confirmButtonText: 'Yes, delete it!',
				 	buttonsStyling: true,
				 	width: '50rem',
				 	confirmButtonAriaLabel: 'aria-label',
				 	cancelButtonAriaLabel: 'aria-label '
				 }).then((result) => {
				 if(result.value){
				   axios.delete(this.initialize, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
				   	swal("Deleted!", "Your content has been deleted.", "success")
					console.log(res.data)
					toastr.success('Operation successful')
					this.$router.push({name: 'Lunch'})
				}).catch(err => {
					console.log(err)
				})
			}else if (result.dismiss === swal.DismissReason.cancel) {
					    swal('Cancelled','Your imaginary file is safe ','error')
					  }
				 })
			},
			clearForm(){
				this.form = {schools: []}
			}
		}
	}
</script>
