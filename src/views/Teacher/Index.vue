<template>
	<section class="content">
	<div class="row">
		<div class="col-md-12">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title">Teachers</h3>
					<div class="box-tools">
						<router-link :to="{ name: 'AddTeacher'}" class="btn btn-success btn-sm">Add</router-link>
					</div>
				</div>
				<div class="box-body">
				  <div class="row">
					<div class="col-md-4">
						<div class="form-group">
						<input type="text" class="form-control custom-search" @keyup.enter="searchData" v-model="search" placeholder="Search name">
					</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
						<multiselect
					      v-model="selectedSchool"
					      :options="optionSchool"
								label="display_name"
					      placeholder="Filter school"
								@input="filteredSchool">
					    </multiselect>
					</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
						<multiselect
					      v-model="selectedGrade"
					      :options="gradeOption"
								label="display_name"
					      placeholder="Filter grade"
								@input="filteredGrade">
					    </multiselect>
					</div>
					</div>
					<!-- /.col-md-4 -->
					<div class="col-md-4">
					<div class="form-group">
							<div style="padding-top: 10px;" class="form-check form-check-inline">
								<input type="checkbox" class="form-check-input">
								 <label class="form-check-label">Include Deactivated</label>
							</div>
						</div>
					</div>
				  </div>

				  <div class="row">
				  	<div class="col-md-12">
					<table class="table table-striped table-hover">
						<thead>
							<tr>
								<th v-for="th in theads">{{th.label}}</th>
							</tr>
						</thead>
						<tbody>
							<data-viewer v-for="data in dataModel" :key="data.id" :data="data"></data-viewer>
						</tbody>
					</table>
				</div>
			</div>
				</div>
				<div class="box-footer">
			 <div class="pagination-footer">
				 <div class="pagination-item">
					 <span>Per page:</span>
					 <select-page :options="options" v-model="per_page" @input="fetchData(pagination = true)"></select-page>
				 </div>
				 <div class="pagination-item">
					 <small>Showing {{from}} of {{total}}</small>
				 </div>
				 <div class="pagination-item">
					 <button class="btn btn-success btn-sm" :disabled="! showPrev || ! pagination" @click="renderList(current_page-1)">Prev</button>
					 <button class="btn btn-success btn-sm" :disabled="! showNext || ! pagination" @click="renderList(current_page+1)">Next</button>
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
import DataViewer from './DataViewer'
import Auth from '../../auth'
import Vue from 'vue'
import SelectPage from '../../vendor/vue-paginate-select'
	export default{
		components: {Multiselect, DataViewer, SelectPage},
		data(){
			return{
      pagination: true,
      selected: null,
      gradeOption: [],
			optionSchool: [],
			selectedSchool: '',
			selectedGrade: '',
      model: [],
      totalPage: null,
      dataModel: [],
      per_page: 3,
      from: 1,
      to: 2,
      search: '',
      current_page: null,
      theads: [
      	{label: 'Name'},
      	{label: 'School'},
      	{label: 'Grade'}
      ],
			options:[3,6,8,10]
			}
		},
		created(){
			this.fetchData()
			this.$store.commit('title_bar_data', 'Teachers')
			document.title = 'Teachers'
			this.fetchSchools()
			this.fetchGrade()
		},
			methods: {
			fetchData(){
				var vm = this
				axios.get('/staff/teachers/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					vm.model = res.data
					this.renderList()
				})
			},
			renderList(pageNumber = 1){
				this.dataModel = []
			    if(this.model.length){
			    	this.from = pageNumber
					for(let i = this.start; i <= this.stop; i++){
                        this.dataModel.push(this.model[i]);
                    }
                    this.current_page = this.from
			    }
			},
			fetchSchools(){
				var vm = this
				axios.get('/staff/schools/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(vm.$data, 'optionSchool', res.data)
				})
			},
			fetchGrade(){
				axios.get('/staff/grades/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'gradeOption', res.data)
				})
			},
			filteredGrade(){
				var self = this
		       	const selected = this.model.filter(function(mode){
		       		return mode.grade.toLowerCase().indexOf(self.selectedGrade.display_name.toLowerCase())>=0
		       	})
		       	this.dataModel = selected
						this.pagination = false
			},
			filteredSchool(){
				var self = this
		       	const selected = this.model.filter(function(mode){
		       		return mode.school.toLowerCase().indexOf(self.selectedSchool.display_name.toLowerCase())>=0
		       	})
		       	this.dataModel = selected
						this.pagination = false
			},
			searchData(){
				var self = this
		       	const search = this.model.filter(function(mode){
		       		return mode.name.toLowerCase().indexOf(self.search.toLowerCase())>=0
		       	})
		       	this.dataModel = search
						this.pagination = false
			}
		},
		computed: {
				total(){
					return this.model.length && (this.model.length > this.per_page) ? Math.ceil(this.model.length/this.per_page) : 1;
				},
				start(){
					 return (this.from - 1) * this.per_page
				},
				stop(){
					if((this.model.length - this.start) >= this.per_page){
                              return (this.from * this.per_page) - 1;
                    }
	               else{
	                   return this.model.length - 1;
	                }
				},
				showNext(){
		            return this.current_page < this.total
		        },

		        showPrev(){
		            return this.current_page > 1
		       },
		       filteredModel(){
		       	var self = this
		       	return this.dataModel.filter(function(mode){
		       		return mode.student_name.toLowerCase().indexOf(self.search.toLowerCase())>=0
		       	})
		       }
			}
	}
</script>
