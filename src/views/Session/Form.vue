<template>
	<section class="content">
	<div class="row">
		<div class="col-md-12">
		<div class="box box-default">
			<div class="box-header with-border">
				<h3 class="box-title">Add Session</h3>
				<div class="box-tools pull-right">
					<button class="btn btn-danger btn-sm" v-if="form.is_open === true" @click="isClose">Close</button>
					<button class="btn btn-success btn-sm" v-else @click="isOpen">Open</button>
				</div>
			</div>
			<div class="box-body">
				<div class="form-group">
					<label>Name</label>
					<input type="text" class="form-control" v-model="form.name">
					<span class="has-feedback" v-if="error.name">{{error.name[0]}}</span>
				</div>
				<div class="form-group">
				<div class="row">
					<div class="col-sm-4">
						<label>School</label>
						<multiselect
					      v-model="form.schools[0]"
					      :options="options"
					      placeholder="Select school"
								label="display_name">
					    </multiselect>
					</div>
					<div class="col-sm-4">
						<label>Start Date</label>
						<datepicker :bootstrapStyling="true" v-model="form.start_on" wrapperClass="col-md-" :calendarButton="true" calendarButtonIcon="fa fa-calendar" :required="true"></datepicker>
					</div>
					<div class="col-sm-4">
						<label>End Date</label>
						<datepicker :bootstrapStyling="true" v-model="form.end_on" wrapperClass="col-md-" :calendarButton="true" calendarButtonIcon="fa fa-calendar" :required="true"></datepicker>
					</div>
				</div>
			   </div>
				<!-- /.form-group -->
				<div class="form-group">
					<label>Days</label>
				</div>
				<div class="form-group">
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="checkbox" value="monday" v-model="form.monday">
							<label class="form-check-label">Monday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" value="tuesday" v-model="form.tuesday">
							<label class="form-check-label">	Tuesday	</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" value="wednessday" v-model="form.wednessday">
							<label class="form-check-label">Wednessday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" value="thursday" v-model="form.thursday">
							<label class="form-check-label">Thursday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" value="friday" v-model="form.friday">
							<label class="form-check-label">Friday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" value="saturday" v-model="form.saturday">
							<label class="form-check-label">Saturday</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="checkbox" value="sunday" v-model="form.sunday">
							<label class="form-check-label">Sunday</label>
						</div>
					<!-- /.form-inline -->
				</div>
	+			<div class="form-group">
						<label>Description</label>
						 <vue-editor v-model="form.description"></vue-editor>
				</div>
			</div>
			<div class="box-footer">
				<div class="col-md-6 col-md-offset-6">
				<div class="space-btn">
					<div class="spece-item">
						<router-link to="/staff/lunch/sessions" class="btn btn-default">Cancel</router-link>
					</div>
					<div class="space-item">
						<button class="btn btn-danger btn-block btn-sm" :disabled="isDisabled" v-if="form.status === '1' " @click="Deactivate">Deactivate</button>
						<button class="btn btn-success btn" :disabled="isDisabled" v-else @click="Activate">Activate</button>
					</div>
					<div class="space-item">
						<button class="btn btn-primary btn-block btn-sm" :disabled="isDisabled" @click="save">Save</button>
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
	import Datepicker from 'vuejs-datepicker'
	import { VueEditor } from 'vue2-editor'
	import moment from 'moment'
	import Auth from '../../auth'
	import Vue from 'vue'

	export default {
		components: {
			Multiselect, Datepicker, VueEditor
		},
		data(){
			return{
				form: {schools: []},
	      options: [],
				store: '/staff/lunch/sessions/',
				initialize: '/staff/lunch/sessions/',
				method: 'post',
				checkedBox: [],
				schoolList: [],
				error: [],
				message: 'New session was created successfully',
				isDisabled: false
			}
		},
		beforeMount(){
			this.fetchSchool()
			if(this.$route.meta.mode === 'edit'){
				this.store = '/staff/lunch/sessions/' + this.$route.params.id + '/'
				this.initialize = '/staff/lunch/sessions/' + this.$route.params.id + '/'
				this.method = 'patch'
				this.message = 'Session was updated successfully'
				this.fetchData()
			}
		},
		methods: {
			fetchData(){
				axios.get(this.initialize, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					this.form = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			fetchSchool(){
				var vm = this
				axios.get('/staff/schools/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(vm.$data, 'options', res.data)
				})
			},
			save(){
				this.isDisabled = true
				this.form.start_on = moment(this.form.start_on).format('YYYY-MM-DD')
				this.form.end_on = moment(this.form.end_on).format('YYYY-MM-DD')
				this.form.schools = [this.form.schools[0].id]
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success(this.message)
					this.$router.push('/staff/lunch/sessions')
				}).catch(err => {
					if(err){
						this.error = err.response.data
						Nprogress.done()
					}

				})
			},
			isOpen(){
				this.form.is_open= true
				this.form.schools = [this.form.schools[0].id]
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('The operation was successful')
					this.$router.push('/staff/lunch/sessions')
				})
			},
			isClose(){
				this.form.is_open = false
				this.form.schools = [this.form.schools[0].id]
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('The operation was successful')
					this.$router.push('/staff/lunch/sessions')
				})
			},
			Deactivate(){
				this.form.status = '2'
				this.form.schools = [this.form.schools[0].id]
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('Session was deactivated successfully')
					this.$router.push('/staff/lunch/sessions')
				})
			},
			Activate(){
				this.form.status = '1'
				this.form.schools = [this.form.schools[0].id]
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('Session was activated successfully')
					this.$router.push('/staff/lunch/sessions')
				})
			}
		}
	}
</script>
