<template>
	<section class="content">
	<div class="row">
		<div class="col-md-12">
			<div class="box box-default">
				<div class="box-header with-border">
					<h2 class="box-title">Members</h2>
				</div>
				<div class="box-body">
				<div class="row">
					<div class="col-md-4">
							<input type="text" class="form-control custom-search" @input="searchData" v-model="search" placeholder="Search for name, email">
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<div style="padding-top: 10px;" class="form-check form-check-inline">
								<input type="checkbox" class="form-check-input">
								 <label class="form-check-label">Include Deactivated</label>
							</div>
						</div>
					</div>
				</div>
				<br/>
				<div class="row">
					<div class="col-md-12">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Students</th>
							</tr>
						</thead>
						<tbody>
							<data-viewer v-for="data in dataModel" :data="data" :key="data.id"></data-viewer>
						</tbody>
					</table>
				</div>
					</div>
				</div>
				<div class="box-footer">
				<div class="pagination-footer">
					<div class="pagination-item">
						<span>Per page:</span>
						<vue-paginate :options="pageOption" v-model="per_page" @input="fetchData(pagination = true)"></vue-paginate>
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
	import Auth from '../../auth'
	import DataViewer from './DataViewer'
	import VuePaginate from '../../vendor/vue-paginate-select'
	import Vue from 'vue'
	export default{
		components: {DataViewer,VuePaginate},
		data(){
			return{
				model: [],
				dataModel: [],
				pagination: true,
				from: '1',
				current_page: null,
				per_page: 3,
				pageOption: [3,6,8,10],
				search: ''
			}
		},
		created(){
			this.fetchData()
			document.title = 'Members'
			this.$store.commit('title_bar_data', 'Members')
		},
		methods:{
			fetchData(){
				axios.get('/staff/members/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					Vue.set(this.$data, 'model', res.data)
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
			searchData(){
			 this.pagination = false
				var self = this
		       	const search = this.model.filter(function(mode){
		       		return mode.first_name.toLowerCase().indexOf(self.search.toLowerCase())>=0 ||
							mode.last_name.toLowerCase().indexOf(self.search.toLowerCase())>=0 ||
							mode.email.toLowerCase().indexOf(self.search.toLowerCase())>=0
		       	})
		       	this.dataModel = search
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
		       		return mode.name.toLowerCase().indexOf(self.search.toLowerCase())>=0
		       	})
		     }
		}
	}
</script>
