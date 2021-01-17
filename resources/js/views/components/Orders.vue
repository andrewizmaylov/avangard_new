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
								    <select class="mt-1 -ml-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" v-model="list">
									    <option :value="allOrders">All orders</option>
									    <option :value="delayedOrders">Delayed orders</option>
									    <option :value="completedOrders">Completed orders</option>
									    <option selected :value="todayOrders">Today orders</option>
									    <option :value="newOrders">New orders</option>
								    </select>
									</th>
								</tr>
							</thead>
		          			<tbody>
		          				<orderrow v-for="order in list" :class="order.position % 2 == 0 ? 'bg-gray-100' : 'bg-white'" :key="order.id" :order="order"></orderrow>
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
				orders: [],
				list: null,
				limit: '10',
			}
		},
		mounted() {
			axios.get('/api/orders')
			    .then(response => {
			        this.orders = response.data;
			        this.list =  response.data;
			    })
			    .catch(error => {
			        console.log(error);
			    });
		},
		computed: {

			allOrders() {
				var pos = 0;
				return this.orders.filter(order => {
					if (order.id) {
						order.position = ++pos;
						return order;
					}
				});
			},
			completedOrders() {
				let position = 0; 
				let startTime = moment(new Date()).format('YYYY-MM-DD 00:00:00');
				let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
				// axios.get('/api/ordersSortBack')
				//     .then(response => {
				//         this.orders = response.data;
				//     })
				//     .catch(error => {
				//         console.log(error);
				//     });
				return this.orders.filter(order => {
					if (order.status == 20 && moment(order.delivery_dt).isBetween(startTime, now)) {
						order.position = ++position;
						return order;
					}
				});
			},
			delayedOrders() {
				let position = 0; 
				let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
				// axios.get('/api/ordersSortBack')
				//     .then(response => {
				//         this.orders = response.data;
				//     })
				//     .catch(error => {
				//         console.log(error);
				//     });
				return this.orders.filter(order => {
					if (order.status == 10 && moment(order.delivery_dt).isBefore(now)) {
						order.position = ++position;
						return order;
					}
				});
			},
			todayOrders() {
				let position = 0; 
				let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
				let plusDay = moment(now).add(1, 'days');
				// axios.get('/api/orders')
				//     .then(response => {
				//         this.orders = response.data;
				//     })
				//     .catch(error => {
				//         console.log(error);
				//     });
				return this.orders.filter(order => {
					if (order.status == 10 && moment(order.delivery_dt).isBetween(now, plusDay)) {
						order.position = ++position;
						return order;
					}
				});
			},
			newOrders() {
				let position = 0; 
				let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
				// axios.get('/api/orders')
				//     .then(response => {
				//         this.orders = response.data;
				//     })
				//     .catch(error => {
				//         console.log(error);
				//     });
				return this.orders.filter(order => {
					if (order.status == 0 && moment(order.delivery_dt).isAfter(now)) {
						order.position = ++position;
						return order;
					}
				});
			},
		},
		methods: {
			getData() {
				console.log(this.limit);
				axios.get('/api/orders/'+this.limit)
				    .then(response => {
				        this.orders = response.data;
				        this.list =  response.data;
				    })
				    .catch(error => {
				        console.log(error);
				    });
			},
			changeOrder(id) {
				this.$router.push('/order'+id)
			},

		}
	}
</script>