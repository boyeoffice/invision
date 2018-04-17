<template>
	<section class="content">
	<div class="row">
		<div class="col-md-6">
		<div class="box box-success">
			<div class="box-header with-border">
				<h3 class="box-title">{{title}}</h3>
			</div>
			<div class="box-body">
				<div :class="{'form-group': true, 'has-error': errors.items[0]}">
					<label>Name</label>
					<input type="text"
					:class="{'form-control': true, 'custom-search': true}"
					v-model="form.name"
					data-vv-delay="1000"
					v-validate="'required|alpha_spaces'">
				</div>
				<div class="form-group">
					<label>School</label>
					<multiselect
					      v-model="selectedSchool"
								label="display_name"
								track-by="id"
					      :options="schools">
					  </multiselect>
				</div>
				<div class="form-group">
					<label>Grade</label>
					<multiselect
					      v-model="selectedGrade"
					      :options="grades"
								track-by="id"
								label="display_name">
					</multiselect>
				</div>
			</div>
			<div class="box-footer">
				<div class="space-btn">
			<div class="space-item">
				<router-link to="/staff/teachers" class="btn btn-sm btn-default">Cancel</router-link>
			</div>
			<div class="space-item" v-if="isDanger">
				<button  class="btn btn-sm btn-danger" @click="clearForm">Clear</button>
			</div>
			<div class="space-item" v-else>
				<button class="btn btn-sm btn-success" v-if="form.status === '2'" @click="reActivate">Reactivate</button>
				<button class="btn btn-sm btn-danger" v-else @click="deActivate">Deactivate</button>
			</div>
			<div class="space-item">
				<button class="btn btn-sm btn-primary" :disabled="isSending" @click="Save">Save</button>
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
import VueSelect from '../../vendor/vue-custom-select'
import Vue from 'vue'
import Auth from '../../auth'
	export default{
		components: {Multiselect, VueSelect},
		data(){
			return{
				form: {},
				selectedSchool: '',
				selectedGrade: '',
				schools: [],
				grades: [],
        model: [],
				isSending: false,
				store: '/staff/teachers/',
				initialize: '/staff/teachers/',
				method: 'post',
				options: [{display_name: 'Bisola'}, {display_name: 'Dare'}, {display_name: 'Nike'}],
				message: 'New teacher was created successfully',
				title: 'Create Teacher',
				isDanger: true
			}
		},
		beforeMount(){
			document.title = 'Teacher'

			if(this.$route.meta.mode === 'edit'){
				this.initialize = '/staff/teachers/' + this.$route.params.id + '/'
				this.store = '/staff/teachers/' + this.$route.params.id + '/'
				this.method = 'patch'
				this.meassage = 'Teacher was updated successfully'
				this.title = 'Edit Teacher'
				this.isDanger = false
				this.fetchData()
			}else{
				this.fetchGrade()
				this.fetchSchools()
			}

		},
		methods: {
			fetchData(){
				axios.get(this.initialize, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'form', res.data)
					this.fetchSchools()
					this.fetchGrade()
				})
			},
			fetchSchools(index){
				axios.get('/staff/schools/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'schools', res.data)

					const selectedSchool = this.schools.filter((obj) => {
						return obj.id.toLowerCase().indexOf(this.form.school) >= 0
						})
						if(this.$route.meta.mode === 'edit'){
							this.selectedSchool = {id: selectedSchool[0].id, display_name: selectedSchool[0].display_name}
						}

				})
			},
			fetchGrade(){
				axios.get('/staff/grades/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'grades', res.data)

					const selectedGrade = this.grades.filter((obj) => {
						return obj.id.toLowerCase().indexOf(this.form.grade) >= 0
						})
						if(this.$route.meta.mode === 'edit'){
							this.selectedGrade = {id: selectedGrade[0].id, display_name: selectedGrade[0].display_name}
						}

				})
			},
			reActivate(){
				this.form.status = '1'
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('Student was activated successfully')
					this.$router.push('/staff/teachers/')
				})
			},
			deActivate(){
				this.form.status = '2'
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('Student was deactivated successfully')
					this.$router.push('/staff/teachers/')
				})
			},
			Save(){
				this.isSending = true
				this.form.school = this.selectedSchool.id
				this.form.grade = this.selectedGrade.id
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					console.log(res.data)
					this.$router.push('/staff/teachers')
					toastr.success(this.message)
				}).catch(error => {
					this.isSending = false
					Nprogress.done()

				})
			},
			clearForm(){
				this.form = {}
			}
		}
	}
</script>
