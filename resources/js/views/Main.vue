<template>
	<div class="my-6">
		<!-- <weather class="mb-6"></weather> -->
		<router-view></router-view>
	</div>
	
</template>
<script>
	import orders from './components/Orders.vue';
	import weather from './Weather.vue';
	export default {
		name: 'mainapp',
		components: {orders, weather},
		data() {
			return {

			}
		},
		mounted() {
			this.$router.push({name: 'orders'});
		}
	}
</script>