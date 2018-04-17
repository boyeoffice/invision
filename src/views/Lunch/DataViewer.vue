<template>
	<tr style="cursor: pointer;" v-on:click="editData">
		<td>{{data.no_lunch_on | moment('YYYY')}}</td>
		<td>{{ data.description }} </td>
		<td><p v-for="list in data.schools">{{list}}</p></td>
		<td>{{ data.no_lunch_on }}</td>
	</tr>
</template>

<script>
import Vue from 'vue'
import monent from 'moment'
	export default {
		props: ['data'],
		mounted(){
			Vue.filter('formatDate', function(value){
					return monent(value).format('YYYY')
			})
		},
		methods: {
			editData(){
				this.$router.push('/staff/lunch/nolunchdays/' + this.data.id)
			}
		}
	}
</script>
