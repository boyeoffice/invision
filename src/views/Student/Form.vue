<template>
	<section class="content">
	<div class="row">
		<div class="col-md-6">
		<div class="box box-success">
			<div class="box-header with-border">
				<h3 class="box-title">Edit Student</h3>
			</div>
			<div class="box-body">
				<div :class="{'form-group': true, 'has-error': errors.items[0]}">
					<label>Name</label>
					<input type="text" class="form-control custom-search"
					v-model="form.name"
					v-validate="'required|alpha_spaces'">
				</div>
				<div class="form-group">
					<label>School</label>
					<multiselect
						:options="schools"
						v-model="selectedSchool"
						label="display_name"
						track-by="id">
					</multiselect>
				</div>
				<div class="form-group">
					<label>Grade</label>
					<multiselect
						:options="grades"
						v-model="selectedGrade"
						label="display_name"
						track-by="id">
					</multiselect>
				</div>
				<div class="form-group">
					<label>Homeroom Teacher</label>
					<multiselect
						:options="teachers"
						v-model="selectedTeacher"
						label="name"
						track-by="id">
					</multiselect>
				</div>
			</div>
			<div class="box-footer">
				<div class="space-btn">
			<div class="space-item">
				<router-link to="/staff/students/" class="btn btn-sm btn-default">Cancel</router-link>
			</div>
			<div class="space-item">
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
import Vue from 'vue'
import Auth from '../../auth'
	export default{
		components: {Multiselect},
		data(){
			return{
				grades: [],
				form: {},
				store: '/staff/students/',
				initialize: '/staff/students/',
				method: 'post',
				schools: [],
				teachers: [],
				selectedSchool: '',
				selectedGrade: '',
				selectedTeacher: '',
				isSending: false
			}
		},
		beforeMount(){
			if(this.$route.meta.mode === 'edit'){
				this.initialize = '/staff/students/' + this.$route.params.id + '/'
				this.store = '/staff/students/' + this.$route.params.id + '/'
				this.method = 'patch'
				this.fetchData()
			}
		},
		methods: {
			fetchData(){
				axios.get(this.initialize, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'form', res.data)
					this.fetchSchools()
					this.fetchGrade()
					this.fetchTeacher()
				})
			},
			fetchSchools(){
				axios.get('/staff/schools/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'schools', res.data)

					const selectedSchool = this.schools.filter((obj) => {
						return obj.id.toLowerCase().indexOf(this.form.school) >= 0
					})
					this.selectedSchool = {id: selectedSchool[0].id, display_name: selectedSchool[0].display_name}
				})
			},
			fetchGrade(){
				axios.get('/staff/grades/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'grades', res.data)

					const selectedGrade = this.grades.filter((obj) => {
						return obj.id.toLowerCase().indexOf(this.form.grade) >= 0
					})
					this.selectedGrade = {id: selectedGrade[0].id, display_name: selectedGrade[0].display_name}
				})
			},
			fetchTeacher(){
				axios.get('/staff/teachers/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'teachers', res.data)

					const selectedTeacher = this.teachers.filter((obj) => {
						return obj.id.toLowerCase().indexOf(this.form.teacher) >= 0
					})
					this.selectedTeacher = {id: selectedTeacher[0].id, name: selectedTeacher[0].name}
				})
			},
			reActivate(){
				this.form.status = '1'
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('Student was activated successfully')
					this.$router.push('/staff/students/')
				})
			},
			deActivate(){
				this.form.status = '2'
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('Student was deactivated successfully')
					this.$router.push('/staff/students/')
				})
			},
			Save(){
				this.isSending = true
				this.form.grade = this.selectedGrade.id
				this.form.school = this.selectedSchool.id
				this.form.teacher = this.selectedTeacher.id
				axios[this.method](this.store, this.form, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('Student was updated successfully')
					this.$router.push('/staff/students/')
				}).catch(error => {
					this.isSending = false
					Nprogress.done()

				})
			}
		}
	}
</script>
