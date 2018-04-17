import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		titleBar: '',
		selectedClass: ''
	},
	mutations: {
		title_bar_data(state, title){
			state.titleBar = title
		   },
		class_selected_data(state, index){
		state.selectedClass = index
	      }
	}
})