<template>
	<section>
		<span class="text-lg text-gray-600">Show orders page (limit 
			<select v-model="limit" class="outline-none" @change="getData()">
				<option selected :value="10">10</option>
				<option :value="50">50</option>
				<option :value="70">70</option>
				<option :value="100">100</option>
				<option :value="1000">All</option>
			</select> 
		)</span>
		<div class="flex flex-col rounded-lg shadow-lg my-6 border border-gray-200">
		    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
		        	<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
		        		<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-100">
								<tr>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
										<span>Order_ID</span> 
									</th>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<span>Partner Name</span> 
									</th>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<span>Order Amount</span> 
									</th>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<span>Product name</span> 
									</th>
									<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								    <select class="mt-1 -ml-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" 
								    v-model="route" @change="fetchData()">
									    <option selected :value="'allOrders'">All orders</option>
									    <option :value="'delayedOrders'">Delayed orders</option>
									    <option :value="'completedOrders'">Completed orders</option>
									    <option selected :value="'todayOrders'">Today orders</option>
									    <option :value="'newOrders'">New orders</option>
								    </select>
									</th>
								</tr>
							</thead>
		          			<tbody>
		          				<orderrow v-for="(order, index) in list" :class="index % 2 == 0 ? 'bg-white' : 'bg-gray-100'" :key="order.id" :order="order"></orderrow>
		          			</tbody>
		        		</table>
		      		</div>
		    	</div>
		    </div>
		</div>
	</section>
</template>
<script>
	import orderrow from './RowFromOrder.vue';

	export default {
		name: 'orders',
		components: {orderrow},
		data() {
			return {
				list: [],
				limit: '10',
				route: 'allOrders',
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			getData(route) {
				axios.get('route')
				    .then(response => {
				        this.orders = response.data;
				        this.list =  response.data;
				    })
				    .catch(error => {
				        console.log(error);
				    });
			},
			async fetchData() {
				try {
					const response = await axios.get('/api/'+this.route);
					this.list = response.data;
				} catch (error) {
				    console.log(error);
				}
			},

			changeOrder(id) {
				this.$router.push('/order'+id)
			},

		}
	}
</script>