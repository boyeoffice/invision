<template>
 <section class="content">
	<div class="row">
		<div class="col-md-6">
			<div class="box box-success">
				<div class="box-header with-border">
					<h3 class="box-title">Grade</h3>
				</div>
				<div class="box-body">
					<div class="form-group">
						<label>Name</label>
					</div>
					<div class="form-group" v-for="(data, index) in grades">
						<div class="row">
						<div class="col-xs-6">
							<input type="text" class="form-control" v-model="data.display_name">
						</div>
							<button class="btn btn-success btn-flat" v-if="data.status === '2'" @click="enableGrade(data)">Enable</button>
							<button class="btn btn-danger btn-flat" v-else @click="disableGrade(data)">Disable</button>
              <button  class="btn btn-flat btn-info" @click="updateGrade(data)">Update</button>
							<button class="btn btn-default btn-flat" @click="deleteGrade(index, data)">Delete</button>
						</div>
					 </div>
					 <div class="form-group">
             <div class="row">
               <div class="col-xs-8">
                 <input type="text" v-model="formGrade.display_name" class="form-control" placeholder="Grade">
               </div>
                <button class="btn btn-primary btn-flat" @click="saveGrade">Save</button>
             </div>
					 </div>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="box box-success">
				<div class="box-header with-border">
					<h3 class="box-title">School</h3>
				</div>
				<div class="box-body">
					<div class="form-group">
						<label>Name</label>
					</div>
					<div class="form-group" v-for="(data, index) in schools">
						<div class="row">
						<div class="col-xs-6">
							<input type="text" class="form-control" v-model="data.display_name">
						</div>
						<button class="btn btn-success btn-flat" v-if="data.status === '2'" @click="enableSCH(data)">Enable</button>
						<button class="btn btn-danger btn-flat" v-else @click="disableSCH(data)">Disable</button>
            <button  class="btn btn-flat btn-info" @click="updateSchool(data)">Update</button>
						<button class="btn btn-default btn-flat" @click="deleteSchool(index, data)">Delete</button>
						</div>
					 </div>
					 <div class="form-group">
             <div class="row">
               <div class="col-xs-8">
                 <input type="text" v-model="formSchool.display_name" class="form-control" placeholder="School name">
               </div>
               	<button class="btn btn-success btn-flat" @click="saveSchool">Save</button>
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
        formSchool: {},
        formGrade: {},
				grades: [],
				schools: []
			}
		},
		created(){
			document.title = 'Misc Metadata'
			this.$store.commit('title_bar_data', 'Misc Metadata')
			this.fetchGrade()
		},
		methods: {
			fetchGrade(){
				axios.get('/staff/grades/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					this.grades = res.data
					this.fetchSchool()
				})
			},
			fetchSchool(){
				axios.get('/staff/schools/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					this.schools = res.data
				})
			},
      enableSCH(data){
        data.status = '1'
        axios.put('/staff/schools/' + data.id + '/', data, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
          toastr.success('The operation was successfull!')
        })
      },
      disableSCH(data){
        data.status = '2'
        axios.put('/staff/schools/' + data.id + '/', data, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
          toastr.success('The operation was successfull!')
        })
      },
      updateSchool(data){
        axios.put('/staff/schools/' + data.id + '/', data, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
          toastr.success('The operation was successfull!')
        })
      },
      enableGrade(data){
        data.status = '1'
        axios.put('/staff/grades/'  + data.id + '/', data, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
          toastr.success('The operation was successfull!')
        })
      },
      updateGrade(data){
        axios.put('/staff/grades/'  + data.id + '/', data, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
          toastr.success('The operation was successfull!')
        })
      },
      disableGrade(data){
        data.status = '2'
          axios.put('/staff/grades/'  + data.id + '/', data, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
            toastr.success('The operation was successfull!')
          })
      },
      saveSchool(){
        axios.post('/staff/schools/', this.formSchool, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
          toastr.success('The operation was successfull!')
          this.schools.push({display_name: this.formSchool.display_name})
          this.formSchool = {}
          this.fetchSchool()
        })
      },
      deleteSchool(index, data){
        axios.delete('/staff/schools/' + data.id + '/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
            toastr.success('The operation was successfull!')
            this.schools.splice(index, 1)
        })
      },
      saveGrade(){
        axios.post('/staff/grades/', this.formGrade, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
          toastr.success('The operation was successfull!')
          this.grades.push({display_name: ''})
          this.formGrade = {}
          this.fetchGrade()
        })
      },
      deleteGrade(index, data){
        axios.delete('/staff/grades/' + data.id + '/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
            toastr.success('The operation was successfull!')
            this.grades.splice(index, 1)
        })
      },
		}
	}
</script>
