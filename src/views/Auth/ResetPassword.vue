<template>
<div class="login-box">
  <div class="login-logo">
    <a href="javascript:void(0)"><b>Invision</b></a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Enter your password</p>

    <form @submit.prevent="Reset">
      <div class="form-group has-feedback">
        <input class="form-control" placeholder="Old Password" type="password" v-model="form.password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input class="form-control" placeholder="New Password" type="password" v-model="form.password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input class="form-control" placeholder="New Password" type="password" v-model="form.password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
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
        form:{password: ''}
      }
    },
    created(){
      document.title = 'Reset Password'
    },
    methods: {
      Reset(){
        this.$emit('login')
      }
    }
  }
</script>