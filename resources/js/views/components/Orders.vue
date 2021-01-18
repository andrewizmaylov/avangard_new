<template>
	<section>
		<div class="flex justify-between">
			<span class="text-lg text-gray-600">{{title}} (limit 
				<select v-model="limit" class="outline-none" @change="changeLimit()">
					<option selected :value="10">10</option>
					<option :value="50">50</option>
					<option :value="70">70</option>
					<option :value="100">100</option>
				</select> 
			 ) from total {{list.length}}</span>
			<div class="flex">
				<button class="shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" @click="subtructLimit" :disabled="start == 0">previouse {{limit}}</button>
				<button class="ml-4 shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" @click="addLimit" :disabled="listEnd">next {{limit}}</button>
			</div>
			
		</div>

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
									    <option :value="'notConfirmedOrders'">Not confirmed yet</option>
									    <option :value="'delayedOrders'">Delayed orders</option>
									    <option :value="'completedOrders'">Completed orders</option>
									    <option selected :value="'todayOrders'">Today orders</option>
									    <option :value="'newOrders'">New orders</option>
								    </select>
									</th>
								</tr>
							</thead>
		          			<tbody>
		          				<orderrow v-for="(order, index) in list.slice(start, end)" :class="index % 2 == 0 ? 'bg-white' : 'bg-gray-100'" :key="order.id" :order="order"></orderrow>
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
				start: 0,
				end: 10,
				limit: '10',
				route: 'allOrders',
			}
		},
		created() {
			this.fetchData();
		},
		methods: {
			changeOrder(id) {
				this.$router.push('/order'+id)
			},

			async fetchData() {
				this.start = 0;
				this.end = this.limit;
				try {
					const response = await axios.get('/api/'+this.route);
					this.list = response.data;
				} catch (error) {
				    console.log(error);
				}
			},
			subtructLimit() {
				if (this.start > this.limit) {
					this.start = parseInt(this.start) - parseInt(this.limit);
					this.end = parseInt(this.end) - parseInt(this.limit);
					return;
				}
				this.start = 0;
				this.end = parseInt(this.limit);
			},
			addLimit() {
				this.start = parseInt(this.start) + parseInt(this.limit);
				this.end = parseInt(this.end) + parseInt(this.limit);
			},
			changeLimit() {
				this.end = parseInt(this.start) + parseInt(this.limit);
			}
		},
		computed: {
			listEnd() {
				return parseInt(this.list.length) <= parseInt(this.end);
			},
			title() {
				if (this.route=="allOrders") {
					return "All orders ";
				} else if (this.route=="notConfirmedOrders") {
					return "Not confirmed orders ";
				} else if (this.route=="delayedOrders") {
					return "Delayed orders ";
				} else if (this.route=="todayOrders") {
					return "Today orders ";
				} else if (this.route=="completedOrders") {
					return "Completed orders ";
				} else {
					return "New orders ";
				}				
			}
		}
	}
</script>