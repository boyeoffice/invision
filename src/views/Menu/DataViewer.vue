<template>
	<tr style="cursor: pointer;" v-on:click="editData">
		<td>{{data.name}}</td>
		<td>{{data.unit_price}}</td>
		<td></td>
		<td></td>
		<td><span v-for="school in data.schools">{{school}}, </span></td>
		<td><span v-for="tag in data.tags">{{tag}}  </span></td>
	</tr>
</template>

<script>
	export default {
		props: ['data'],
		methods: {
			editData(){
				this.$router.push('/staff/lunch/items/' + this.data.id)
			}
		}
	}
</script>
