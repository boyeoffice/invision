<template>
	<div>
		<stats></stats>
	</div>
</template>

<script>
	import Stats from './Stats'
	export default{
		components: {Stats},
		mounted(){
		document.title = 'Dashboard'
		this.$store.commit('title_bar_data', 'Dashboard')
        }
	}
</script>