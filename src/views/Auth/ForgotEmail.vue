<template>
<div class="login-box">
  <div class="login-logo">
    <a href="javascript:void(0)"><b>Invision</b></a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Enter Your email</p>

    <form @submit.prevent="Send">
      <div class="form-group has-feedback">
        <input class="form-control" placeholder="Email" type="text" v-model="form.email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Send</button>
        </div>
        <!-- /.col -->
      </div>
    </form>
  </div>
  <!-- /.login-box-body -->
</div>
</template>

<script>
	export default{
		data(){
			return{
				form:{email: 'admin@admin.com'}
			}
		},
		created(){
			document.title = 'Forgot Email'
		},
    methods: {
      Send(){
        this.$emit('reset')
      }
    }
	}
</script>