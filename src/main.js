import './lib/css.js'
import './lib/script.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './Vuex/store'
import Auth from './auth'
import axios from 'axios'


axios.defaults.baseURL = 'https://api.intg.hakkyo.org'
//axios.defaults.headers.common['Authorization'] = 'Token ' + Auth.getToken()


import VueGoodTable from 'vue-good-table'
Vue.use(VueGoodTable)

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
import VueLocalStorage from 'vue-ls'
Vue.use(VueLocalStorage)
window.axios = require('axios')
Vue.use(require('vue-moment'))

Vue.config.productionTip = false


window.toastr = require('toastr/build/toastr.min.js');
window.innerHeight = 800;

window.toastr.options = {
    positionClass: "toast-top-center",
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
}


window.Nprogress = require('nprogress')
axios.interceptors.request.use(function (config) {
  Nprogress.start()
  return config
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response){
  Nprogress.done()
  return response
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})
$(document).ajaxComplete(function( event, request, settings ) {
  console.log(2)
  Nprogress.done()
})
$(document).ajaxStart(function() {
  Nprogress.start()
})


// Error interceptor can be used for global error handling

axios.interceptors.response.use(function (response) {

    return response;
}, function (error) {
        if(error.response.status === 401) {
            toastr.warning('Your session has expired!')
            window.location = '/login'
        }else if(error.response.status === 400){
          toastr.warning('Please check all the input')
          Nprogress.done()
        }
        return Promise.reject(error)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
