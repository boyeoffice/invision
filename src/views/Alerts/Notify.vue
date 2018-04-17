<template>
	<section class="content">
	<div class="row">
		<div class="col-md-12">
			<div class="box box-warning">
				<div class="box-header with-border">
					<h2 class="box-title">Alert</h2>
				</div>
			<div class="box-body">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>From</th>
							<th>Description</th>
							<th>Received</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><b>Events</b></td>
							<td><b>Hogsmeade trip event has been cancelled</b></td>
							<td><b>Today - 9:50 PM</b></td>
						</tr>
						<tr>
							<td>Store</td>
							<td>floo Powder is running low</td>
							<td>10/25/17 - 10:50 AM</td>
						</tr>
						<tr>
							<td>Lunch</td>
							<td>Lunch for Draco Malfoy has been refunded</td>
							<td>09/01/17 - 8:33 PM</td>
						</tr>
					</tbody>
				</table>
			</div>
				<div class="box-footer">
					<div class="pagination-footer">
						<div class="pagination-item">
							<span>Per page:</span>
							<select>
								<option>3</option>
								<option>6</option>
								<option>8</option>
								<option>10</option>
							</select>
						</div>
						<div class="pagination-item">
							<small>Showing 1 of 1</small>
						</div>
						<div class="pagination-item">
							<button class="btn btn-success btn-sm" disabled="disabled">Prev</button>
							<button class="btn btn-success btn-sm" disabled="disabled">Next</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
</template>

<script>
	export default{
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
			document.title = 'Notifications'
			this.$store.commit('title_bar_data', 'Notifications')
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
