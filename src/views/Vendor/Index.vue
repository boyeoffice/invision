<template>
<section class="content">
	<div class="row">
		<div class="col-md-12">
			<div class="box box-default">
			<div class="box-header with-border">
				<h3 class="box-title">Vendors</h3>
				<div class="box-tools">
					<router-link to="/staff/lunch/vendors/add" class="btn btn-success btn-sm">Add</router-link>
				</div>
			</div>
			<div class="box-body">
				<div class="row">
					<div class="col-md-4">
					<div class="form-group">
						<input type="text" class="form-control custom-search" placeholder="Search vendor" @keyup.enter="searchData" v-model="search">
					</div>
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
				<div class="row">
					<div class="col-sm-12">
						<table class="table table-hover table-striped">
							<thead>
								<tr>
									<th v-for="th in theads">{{th.label}}</th>
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
import DataViewer from './DataViewer'
import VuePaginate from '../../vendor/vue-paginate-select'
import Auth from '../../auth'
import Vue from 'vue'
	export default{
		components: {
			DataViewer,
			VuePaginate
		},
		data(){
			return{
				pagination: true,
				theads: [
					{label: 'Vendor', key: 'vendor', sort: true}
				],
				model: [],
				dataModel: [
				{id: '', name: ''}
				],
				search: '',
				from: '1',
				current_page: null,
				per_page: 3,
				pageOption: [3,6,8,10]
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
		       }
		},
		mounted(){
			this.$store.commit('title_bar_data', 'Vendor')
			document.title = 'Vendors | Invision'
			this.fetchData()
		},
		methods: {
		fetchData(){
		var vm = this
		axios('/staff/lunch/vendors/', {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
			console.log(res.data)
			Vue.set(vm.$data, 'model', res.data)
			Vue.filter('momentYear', function(value){
				return moment(value).fromNow()
				})
			this.renderList()
			}).catch(err => {
			 console.log(err)
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
		       		return mode.name.toLowerCase().indexOf(self.search.toLowerCase())>=0
		       	})
		       	this.dataModel = search
			}
	   }
	}
</script>
