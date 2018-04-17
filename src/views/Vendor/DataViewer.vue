<template>
	<tr style="cursor: pointer;" v-on:click="editData">
		<td>{{data.name}}</td>
	</tr>
</template>

<script>
	export default {
		props: ['data'],
		methods: {
			editData(){
				this.$router.push('/staff/lunch/vendors/' + this.data.id)
			}
		}
	}
</script>