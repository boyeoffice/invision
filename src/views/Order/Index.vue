<template>
	<div class="row">
		<div class="col-md-4">
			<div class="box box-primary">
				<div class="box-body">
					<form>
						<div class="form-group">
							<label>School</label>
							<multiselect
					      v-model="selected"
					      label="school_name"
					      :options="options">
					      </multiselect>
						</div>
						<div class="form-group">
							<label>Session</label>
							<multiselect
					      v-model="selected"
					      label="school_name"
					      :options="options">
					      </multiselect>
						</div>
						<div class="form-group">
							<label>Vendor</label>
							<multiselect
					      v-model="selected"
					      label="school_name"
					      :options="options">
					      </multiselect>
						</div>
						<div class="form-group">
							<label>Status</label>
							<multiselect
					      v-model="status"
					      :options="statusOptions">
					      </multiselect>
						</div>
						<div class="form-group">
							<label>Search</label>
							<input type="text" class="form-control custom-search" v-model="search" name="">
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="col-md-8">
			<div class="box box-warning">
				<div class="box-header">
					<div class="row">
						<div class="col-md-4">
							<div class="form-group">
							<input type="text" class="form-control custom-search" placeholder="Search">
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
					<!-- /.row -->
				</div>
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th v-for="th in theads">{{th.label}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="data in filteredOrder">
							<td>{{data.id}}</td>
							<td>{{data.session}}</td>
							<td>{{data.school}}</td>
							<td>{{data.parent}}</td>
							<td>{{data.student}}</td>
							<td>{{data.status}}</td>
							<td><router-link :to="'/order/' + data.id">Edit </router-link></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- /.col-md-8 -->
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
	export default{
		components: {Multiselect},
		data(){
			return{
				theads: [
					{label: 'ID'},
					{label: 'Session'},
					{label: 'School'},
					{label: 'Parent'},
					{label: 'Student'},
					{label: 'Status'},
					{label: 'Action'}
				],
				order: [
					{id: '1', session: '2017 - Spring',
					school: 'Hogwarts', parent: 'Molly Weas', student: 'Ginny Weasley', status: 'Completed'},
					{id: '2', session: '2017 - Spring',
					school: 'Hogwarts', parent: 'Molly Weas', student: 'Ginny Weasley', status: 'Completed'},
					{id: '2', session: '2017 - Spring',
					school: 'Hogwarts', parent: 'Molly Weas', student: 'Ginny Weasley', status: 'Completed'},
					{id: '2', session: '2017 - Spring',
					school: 'Hogwarts', parent: 'Molly Weas', student: 'Ginny Weasley', status: 'Completed'},
					{id: '3', session: '2017 - Spring',
					school: 'Hogwarts', parent: 'Lilly Potter', student: 'Harry Potter', status: 'Cancelled'},
					{id: '3', session: '2017 - Spring',
					school: 'Hogwarts', parent: 'Lilly Potter', student: 'Harry Potter', status: 'Cancelled'},
					{id: '3', session: '2017 - Spring',
					school: 'Hogwarts', parent: 'Lilly Potter', student: 'Harry Potter', status: 'Cancelled'}

				],
				options: ['Hogwarts'],
				selected: null,
				statusOptions: ['Cancelled', 'Completed'],
				status: 'Cancelled',
				search: 'Cancelled'
			}
		},
		created(){
			document.title = 'Orders'
			this.$store.commit('title_bar_data', 'Orders')
		},
		computed: {
			filteredOrder(){
		       	var self = this
		       	return this.order.filter(function(mode){
		       		return mode.status.toLowerCase().indexOf(self.status.toLowerCase())>=0
		       	})
		       }
		}
	}
</script>
