<template>
  <div class="login-page">
    <div class="login-form">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <div class="login-wrapper">
              <h2>Welcome</h2>
              <form v-on:submit.prevent="loginUser()">
                <div class="form-group has-feedback">
                  <input type="text" class="form-control input-control-form" placeholder="Email" v-model="form.email">
                  <span class="glyphicon glyphicon-envelope form-control-feedback form-control-feedback-custom"></span>
                </div>
                <div class="form-group has-feedback">
                  <input type="text" class="form-control input-control-form" placeholder="Password" v-model="form.password">
                  <span class="glyphicon glyphicon-lock form-control-feedback form-control-feedback-custom"></span>
                </div>
                <div class="row">
                  <div class="col-xs-6">
                    <div class="form-group">
                    <a href="#">Forgot Email?</a>
                  </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group">
                    <a href="#" class="pull-right">Forgot Password?</a>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <button v-if="!isLoading" type="submit" class="btn btn-block btn-primary login-button btn-custom-primary">
                  SIGN IN </button>
                   <button v-else disabled="disabled" class="btn btn-block btn-primary login-button btn-custom-primary">
                  PLEASE WAIT... </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { APIENDPOINT } from '../../app.config'

import Auth from './auth'
  export default{
    data(){
      return{
        form: {email: 'robosung@geekcake.com', password: 'robsung123'},
        isLoading: false
      }
    },
    methods:{
      loginUser(){
        var vm = this
        vm.isLoading = true
          axios.post(APIENDPOINT + '/staff/auth/', this.form).then(res => {
            Auth.set(res.data.token)
            vm.$store.commit('login_data')
            this.$router.push('/')
          }).catch(err => {
            vm.isLoading = false
            console.log(err)
          })
      }
    }
}
</script>

<style>
  .content-wrapper {
    margin-left: 0;
  }
</style>