import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export const store = new Vuex.Store({
	state: {
		isLoggedIn: !!localStorage.getItem('api_token'),
		titleTop: ''
	},
	mutations: {
		login_data(state){
			state.isLoggedIn = true
		},
		logout_data(state){
			state.isLoggedIn = false
		},
		title_bar_data(state, title){
			state.titleTop = title
		}
	}
})