<template>
	<section class="content">
	<div class="row">
		<div class="col-md-6">
			<div class="box box-default">
				<div class="box-header with-border">
					Invite Staffs
				</div>
				<div class="box-body">
					<textarea class="form-control" rows="4" v-model="form"></textarea>
				</div>
				<div class="box-footer">
						<div class="form-group">
						<router-link to="/staff/staffs" class="btn btn-default"> Cancel</router-link>
						<button class="btn-primary btn" @click="send">Send Invite(s)</button>
					</div>
				  </div>
			</div>
		</div>
	</div>
</section>
</template>

<script>
import Auth from '../../auth'
	export default{
		data(){
			return{
				form: 'nymfodora.tonks@gmail.com, renus.linp@gmail.com',
				emails: []
			}
		},
		methods: {
			send(){
				axios.post('/staff/invite-staff/', this.emails, {headers: {Authorization: 'Token ' + Auth.getToken()}}).then(res => {
					toastr.success('You have sent invitation to ' + this.emails[index])
				})
			}
		},
		computed: {
			convert(){
				return this.emails = this.form.split(',')
			}
		}
	}
</script>
